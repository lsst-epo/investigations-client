"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";
import { SelectQuestion } from "@/types/questions";
import { Option } from "@/components/shapes/option";
import { getLabelByValue } from "@/components/questions/utils";

interface SimpleTextProps {
  value?: string;
  options?: Array<Option>;
  className?: string;
  type: SelectQuestion;
}

const SimpleSelect: FunctionComponent<SimpleTextProps> = ({
  value,
  options = [],
  className,
}) => {
  const { t } = useTranslation();

  const label = getLabelByValue(options, value);

  return (
    <Styled.TextReview className={className}>
      {label || t("review.no_selection")}
    </Styled.TextReview>
  );
};

SimpleSelect.displayName = "Review.Simple.Select";

export default SimpleSelect;
