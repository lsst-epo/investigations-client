"use client";
import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import useAnswer from "@/hooks/useAnswer";
import { isNullish } from "@/lib/utils";
import { WidgetInput } from "@/types/answers";
import InteractiveCalculator from "@/components/calculators/Interactive";
import * as Styled from "./styles";
import { Equation } from "@/types/calculators";

const Fragment = graphql(`
  fragment CalculatorQuestion on questions_default_Entry {
    id
    questionText
    equation
  }
`);

interface CalculatorQuestionProps {
  id: string;
  data: FragmentType<typeof Fragment>;
}

const CalculatorQuestion: FunctionComponent<CalculatorQuestionProps> = ({
  id,
  data,
}) => {
  const { questionText, equation } = useFragment(Fragment, data);
  const { answer: value, onChangeCallback } = useAnswer<WidgetInput>(id);

  if (isNullish(equation)) return null;

  return (
    <Styled.QuestionNumber {...{ id }}>
      <label htmlFor={id}>{questionText}</label>
      <Styled.CalculatorWrapper>
        <InteractiveCalculator
          {...{
            id,
            equation: equation as Equation,
            value,
            onChangeCallback,
          }}
        />
      </Styled.CalculatorWrapper>
    </Styled.QuestionNumber>
  );
};

CalculatorQuestion.displayName = "Questions.Calculator;";

export default CalculatorQuestion;
