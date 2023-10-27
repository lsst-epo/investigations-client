"use client";

import {
  createContext,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";
import { Query } from "@/gql/student-schema/graphql";
import { AnswerData, Answers, InvestigationId } from "@/types/answers";

function setLocalStorage(investigationId: InvestigationId, answers: Answers) {
  if (!investigationId) return;

  localStorage.setItem(`${investigationId}_answers`, JSON.stringify(answers));

  const storageEvent = new Event("storageEvent");
  document.dispatchEvent(storageEvent);
}

const StoredAnswersContext = createContext<{
  answers: Answers;
  onChangeCallback?: (
    data: AnswerData,
    questionId: string,
    answerId?: string | null
  ) => void;
}>({ answers: {} });

function StoredAnswersProvider(props: {
  answers: Query["answers"];
  children: React.ReactNode;
  investigationId: InvestigationId;
}) {
  const snapshotUpdateCount = useRef(0);

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
    const browserAnswers = JSON.parse(
      localStorage.getItem(`${props.investigationId}_answers`) ?? "{}"
    ) as Answers;

    // initially merge answer sets with priority given to answers stored in DB
    if (snapshotUpdateCount.current === 0) {
      const serverAnswers = JSON.parse(getServerSnapshot()) as Answers;
      const mergedAnswers = Object.assign({}, browserAnswers, serverAnswers);

      return JSON.stringify(mergedAnswers);
    }

    // on subsequent updates, just use local storage
    return JSON.stringify(browserAnswers);
  }, [props.investigationId, getServerSnapshot]);

  const storedAnswers = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const answers = (JSON.parse(storedAnswers) as Answers) ?? {};

  const onChangeCallback = useCallback(
    (data: AnswerData, questionId: string, answerId?: string | null) => {
      const prevAnswers = (JSON.parse(getSnapshot()) as Answers) ?? {};
      const newAnswers = Object.assign({}, prevAnswers, {
        [questionId]: {
          data,
          questionId,
          ...(answerId && { id: answerId }),
        },
      });
      snapshotUpdateCount.current++;
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
