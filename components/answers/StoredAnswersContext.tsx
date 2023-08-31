"use client";

import { createContext, useCallback, useState } from "react";
import { Query } from "@/gql/graphql";
import { Answers } from "@/types/answers";

const StoredAnswersContext = createContext<{
  answers: Answers;
  onChangeCallback?: (data: string, questionId: string) => void;
  onSaveCallback?: () => void;
}>({ answers: {} });

function StoredAnswersProvider(props: {
  answers: Query["answers"];
  children: React.ReactNode;
}) {
  const initialState = Array.isArray(props.answers)
    ? (Object.fromEntries(
        props.answers.map((answer) => [answer?.questionId, answer])
      ) as Answers)
    : {};
  const [answerState, setAnswerState] = useState<Answers>(initialState);

  const onChangeCallback = useCallback(
    (data: string, questionId: string) =>
      setAnswerState((prevState) =>
        Object.assign({}, prevState, {
          [questionId]: { data, questionId: Number(questionId) },
        })
      ),
    []
  );

  const onSaveCallback = useCallback(() => {
    console.log(answerState);
  }, []);

  return (
    <StoredAnswersContext.Provider
      value={{ answers: answerState, onChangeCallback, onSaveCallback }}
    >
      {props.children}
    </StoredAnswersContext.Provider>
  );
}

StoredAnswersProvider.displayName = "StoredAnswers.Provider";

export default StoredAnswersContext;

export { StoredAnswersProvider };
