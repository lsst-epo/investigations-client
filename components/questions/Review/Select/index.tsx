"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "../styles";
import { Option } from "@/components/shapes/option";
import { getLabelByValue } from "@/components/questions/utils";
import { BaseReviewProps } from "@/types/questions";
import { SelectInput } from "@/types/answers";
import useAnswer from "@/hooks/useAnswer";

interface SelectProps extends BaseReviewProps {
  options: Array<Option>;
  questionText: string;
}

const SelectReview: FunctionComponent<SelectProps> = ({
  id,
  options = [],
  number,
  questionText,
}) => {
  const { t } = useTranslation();
  const { answer } = useAnswer<SelectInput>(id);
  const label = getLabelByValue(options, answer);

  return (
    <Styled.ReviewListItem value={number}>
      {questionText}
      <Styled.Text>{label || t("review.no_selection")}</Styled.Text>
    </Styled.ReviewListItem>
  );
};

SelectReview.displayName = "Review.Select";

export default SelectReview;
