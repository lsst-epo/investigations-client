"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "../styles";
import { Option } from "@/components/shapes/option";
import { getLabelByValue } from "@/components/questions/utils";
import { BaseReviewProps } from "@/types/questions";
import { SelectInput } from "@/types/answers";

interface SelectProps extends BaseReviewProps<SelectInput> {
  options: Array<Option>;
  questionText: string;
}

const SelectReview: FunctionComponent<SelectProps> = ({
  value,
  options = [],
  number,
  questionText,
}) => {
  const { t } = useTranslation();

  const label = getLabelByValue(options, value);

  return (
    <Styled.ReviewListItem value={number}>
      {questionText}
      <Styled.Text>{label || t("review.no_selection")}</Styled.Text>
    </Styled.ReviewListItem>
  );
};

SelectReview.displayName = "Review.Select";

export default SelectReview;
