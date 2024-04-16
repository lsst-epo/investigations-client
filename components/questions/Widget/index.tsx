"use client";
import { ComponentType, FunctionComponent } from "react";
import isNull from "lodash/isNull";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import useAnswer from "@/hooks/useAnswer";
import { WidgetInput } from "@/types/answers";
import QuestionNumber from "@/components/questions/QuestionNumber";
import ColorFilterToolQuestion from "./ColorFilterTool";
import SourceSelectorQuestion from "./SourceSelector";
import LightCurveToolQuestion from "./LightCurveTool";
import * as Styled from "./styles";
import ErrorBoundary from "@/components/atomic/ErrorBoundary";

const Fragment = graphql(`
  fragment WidgetQuestion on questions_default_Entry {
    __typename
    id
    instructions: widgetInstructions
    questionWidgetsBlock {
      __typename
      ...ColorFilterToolQuestion
      ...SourceSelectorQuestion
      ...LightCurveQuestion
    }
  }
`);

export interface WidgetProps {
  data: FragmentType<typeof Fragment>;
}

export interface WidgetQuestion<T = any> {
  data: T;
  instructions: string;
  value?: WidgetInput;
  onChangeCallback: (data: WidgetInput) => void;
}

const WIDGET_MAP: Record<string, ComponentType<WidgetQuestion>> = {
  questionWidgetsBlock_colorFilterToolBlock_BlockType: ColorFilterToolQuestion,
  questionWidgetsBlock_sourceSelectorBlock_BlockType: SourceSelectorQuestion,
  questionWidgetsBlock_lightCurveBlock_BlockType: LightCurveToolQuestion,
};

const WidgetQuestion: FunctionComponent<WidgetProps> = ({ data }) => {
  const { id, instructions, questionWidgetsBlock } = useFragment(
    Fragment,
    data
  );
  const { answer: value, onChangeCallback } = useAnswer<WidgetInput>(id || "");

  if (isNull(questionWidgetsBlock) || isNull(id)) {
    console.error("No widgets assigned to this question.");

    return null;
  }

  const [widget] = questionWidgetsBlock;

  if (isNull(widget)) {
    console.error("No widgets assigned to this question.");

    return null;
  }

  const { __typename } = widget;

  const Widget = WIDGET_MAP[__typename];

  if (!Widget) {
    console.error(`"${__typename}" is not a valid input for this widget type.`);

    return null;
  }

  return (
    <QuestionNumber {...{ id }}>
      <Styled.QuestionLabel
        dangerouslySetInnerHTML={{ __html: instructions || "" }}
      />
      <ErrorBoundary>
        <Widget
          data={widget}
          instructions={instructions || ""}
          {...{ value, onChangeCallback }}
        />
      </ErrorBoundary>
    </QuestionNumber>
  );
};

WidgetQuestion.displayName = "Questions.Widget";

export default WidgetQuestion;
