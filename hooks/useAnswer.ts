import { useCallback, useContext } from "react";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import { AnswerData } from "@/types/answers";

const useAnswer = (
  id: string
): { answer?: AnswerData; onChangeCallback: (data: AnswerData) => void } => {
  const { answers, onChangeCallback: setter } =
    useContext(StoredAnswersContext);

  const answer = answers[id];

  const onChangeCallback = useCallback(
    (data: AnswerData) => setter && setter(data, id),
    [id, setter]
  );

  return { answer, onChangeCallback };
};

export default useAnswer;
