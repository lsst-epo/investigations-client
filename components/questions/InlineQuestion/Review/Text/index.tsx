"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

const InlineText: FunctionComponent<{
  value?: string;
  className?: string;
}> = ({ value, className }) => {
  const { t } = useTranslation();

  return (
    <Styled.TextReview className={className}>
      {value || t("review.no_answer")}
    </Styled.TextReview>
  );
};

InlineText.displayName = "Review.Inline.Text";

export default InlineText;
