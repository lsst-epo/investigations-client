"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { BaseReviewProps, CalculatorConfig } from "@/types/questions";
import { WidgetInput } from "@/types/answers";
import useAnswer from "@/hooks/useAnswer";
import StaticCalculator from "@/components/calculators/static";
import * as Styled from "../styles";

const CalculatorReview: FunctionComponent<
  CalculatorConfig & BaseReviewProps
> = ({ id, number, questionText, equation }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { answer: value } = useAnswer<WidgetInput>(id);

  return (
    <Styled.ReviewListItem value={number}>
      {questionText}
      {value ? (
        <StaticCalculator type={equation} locale={language} {...{ value }} />
      ) : (
        t("review.no_answer")
      )}
    </Styled.ReviewListItem>
  );
};

CalculatorReview.displayName = "Review.CalculatorReview";

export default CalculatorReview;
