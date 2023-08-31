"use client";

import { createContext, useCallback, useSyncExternalStore } from "react";
import { Query } from "@/gql/graphql";
import { Answers, InvestigationId } from "@/types/answers";

function setLocalStorage(investigationId: InvestigationId, answers: Answers) {
  if (!investigationId) return;

  localStorage.setItem(`${investigationId}_answers`, JSON.stringify(answers));

  const storageEvent = new Event("storageEvent");
  document.dispatchEvent(storageEvent);
}

const StoredAnswersContext = createContext<{
  answers: Answers;
  onChangeCallback?: (
    data: string,
    questionId: string,
    answerId?: string | null
  ) => void;
}>({ answers: {} });

function StoredAnswersProvider(props: {
  answers: Query["answers"];
  children: React.ReactNode;
  investigationId: InvestigationId;
}) {
  function subscribe(listener: () => void) {
    document.addEventListener("storageEvent", listener);
    return () => {
      document.removeEventListener("storageEvent", listener);
    };
  }

  const getServerSnapshot = useCallback(() => {
    const answerSet = Array.isArray(props.answers)
      ? (Object.fromEntries(
          props.answers.map((answer) => [answer?.questionId, answer])
        ) as Answers)
      : {};
    return JSON.stringify(answerSet);
  }, [JSON.stringify(props.answers)]); // eslint-disable-line react-hooks/exhaustive-deps

  const getSnapshot = useCallback(() => {
    return (
      localStorage.getItem(`${props.investigationId}_answers`) ??
      getServerSnapshot()
    );
  }, [props.investigationId, getServerSnapshot]);

  const storedAnswers = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const answers = (JSON.parse(storedAnswers) as Answers) ?? {};

  const onChangeCallback = useCallback(
    (data: string, questionId: string, answerId?: string | null) => {
      const prevAnswers = (JSON.parse(getSnapshot()) as Answers) ?? {};
      const newAnswers = Object.assign({}, prevAnswers, {
        [questionId]: {
          data,
          questionId: Number(questionId),
          ...(answerId && { id: answerId }),
        },
      });
      setLocalStorage(props.investigationId, newAnswers);
    },
    [props.investigationId, getSnapshot]
  );

  return (
    <StoredAnswersContext.Provider value={{ answers, onChangeCallback }}>
      {props.children}
    </StoredAnswersContext.Provider>
  );
}

StoredAnswersProvider.displayName = "StoredAnswers.Provider";

export default StoredAnswersContext;

export { StoredAnswersProvider };
