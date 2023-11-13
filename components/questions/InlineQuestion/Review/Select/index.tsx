"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";
import { getLabelByValue } from "@/components/questions/utils";
import { Option } from "@/components/shapes/option";

const InlineSelect: FunctionComponent<{
  value?: string;
  options: Array<Option>;
  className?: string;
}> = ({ value, options = [], className }) => {
  const { t } = useTranslation();

  const label = getLabelByValue(options, value);

  return (
    <Styled.TextReview className={className}>
      {label || t("review.no_selection")}
    </Styled.TextReview>
  );
};

InlineSelect.displayName = "Review.Inline.Select";

export default InlineSelect;
