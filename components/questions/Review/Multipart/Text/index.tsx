"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "../styles";
import { TextInput } from "@/types/answers";

const InlineText: FunctionComponent<{
  value?: TextInput;
}> = ({ value }) => {
  const { t } = useTranslation();

  return (
    <Styled.TextReview>{value || t("review.no_answer")}</Styled.TextReview>
  );
};

InlineText.displayName = "Review.Inline.Text";

export default InlineText;
