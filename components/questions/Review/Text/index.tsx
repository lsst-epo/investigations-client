"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "../styles";
import { BaseReviewProps } from "@/types/questions";
import { TextInput } from "@/types/answers";

interface TextProps extends BaseReviewProps<TextInput> {
  questionText: string;
}

const TextReview: FunctionComponent<TextProps> = ({
  value,
  number,
  questionText,
}) => {
  const { t } = useTranslation();

  return (
    <Styled.ReviewListItem value={number}>
      {questionText}
      <Styled.Text>{value || t("review.no_answer")}</Styled.Text>
    </Styled.ReviewListItem>
  );
};

TextReview.displayName = "Review.Text";

export default TextReview;
