"use client";
import { FunctionComponent, ChangeEvent } from "react";
import useAnswer from "@/hooks/useAnswer";
import { MultipartQuestionData } from "@/types/answers";
import { PartProps } from "..";
import * as Styled from "./styles";

const Text: FunctionComponent<PartProps> = ({ id, questionId }) => {
  const { answer = {}, onChangeCallback } =
    useAnswer<MultipartQuestionData>(questionId);

  return (
    <Styled.InlineTextInput
      type="text"
      defaultValue={answer[id] || ""}
      onBlur={(event: ChangeEvent<HTMLInputElement>) =>
        onChangeCallback &&
        onChangeCallback({ ...answer, [id]: event.target.value })
      }
    />
  );
};

Text.displayName = "Questions.Multipart.Text";

export default Text;
