"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";
import {
  SelectQuestion,
  TextAreaQuestion,
  TextQuestion,
} from "@/types/questions";

interface SimpleTextProps {
  value?: string;
  className?: string;
  type: TextQuestion | TextAreaQuestion | SelectQuestion;
}

const SimpleText: FunctionComponent<SimpleTextProps> = ({
  value,
  className,
  type = "text",
}) => {
  const { t } = useTranslation();

  const defaults = {
    text: "review.no_answer",
    textarea: "review.no_answer",
    select: "review.no_selection",
  };

  return (
    <Styled.TextReview className={className}>
      {value || t(defaults[type])}
    </Styled.TextReview>
  );
};

SimpleText.displayName = "Review.Simple.Text";

export default SimpleText;
