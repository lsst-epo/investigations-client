import { useCallback, useContext } from "react";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import { AnswerData } from "@/types/answers";

const useAnswer = <T extends AnswerData>(
  id: string
): { answer?: T; onChangeCallback: (data: T) => void } => {
  const { answers, onChangeCallback: setter } =
    useContext(StoredAnswersContext);

  const answer = answers[id];
  const { data } = answer || {};

  const onChangeCallback = useCallback(
    (data: T) => setter && setter(data, id),
    [id, setter]
  );

  return { answer: data as T, onChangeCallback };
};

export default useAnswer;
