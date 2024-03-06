"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "../styles";
import { BaseReviewProps } from "@/types/questions";
import { TextInput } from "@/types/answers";
import useAnswer from "@/hooks/useAnswer";

interface TextProps extends BaseReviewProps {
  questionText: string;
}

const TextReview: FunctionComponent<TextProps> = ({
  id,
  number,
  questionText,
}) => {
  const { t } = useTranslation();
  const { answer } = useAnswer<TextInput>(id);

  return (
    <Styled.ReviewListItem value={number}>
      {questionText}
      <Styled.Text>{answer || t("review.no_answer")}</Styled.Text>
    </Styled.ReviewListItem>
  );
};

TextReview.displayName = "Review.Text";

export default TextReview;
