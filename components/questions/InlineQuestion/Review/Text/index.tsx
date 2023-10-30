"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";
import { SelectQuestion, TextQuestion } from "@/types/questions";

const InlineText: FunctionComponent<{
  value?: string;
  type?: TextQuestion | SelectQuestion;
  className?: string;
}> = ({ value, type = "text", className }) => {
  const { t } = useTranslation();

  const defaults = {
    text: "review.no_answer",
    select: "review.no_selection",
  };

  return (
    <Styled.TextReview className={className}>
      {value || t(defaults[type])}
    </Styled.TextReview>
  );
};

InlineText.displayName = "Review.Inline.Text";

export default InlineText;
