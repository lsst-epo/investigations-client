"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "../styles";
import { getLabelByValue } from "@/components/questions/utils";
import { Option } from "@/components/shapes/option";
import { SelectInput } from "@/types/answers";

const InlineSelect: FunctionComponent<{
  value?: SelectInput;
  options: Array<Option>;
}> = ({ value, options = [] }) => {
  const { t } = useTranslation();

  const label = getLabelByValue(options, value);

  return (
    <Styled.TextReview>{label || t("review.no_selection")}</Styled.TextReview>
  );
};

InlineSelect.displayName = "Review.Inline.Select";

export default InlineSelect;
