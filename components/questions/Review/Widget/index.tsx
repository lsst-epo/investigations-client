"use client";
import { ComponentType, FunctionComponent } from "react";
import ColorFilterToolReview from "./ColorFilterTool";
import SourceSelectorReview from "./SourceSelector";
import LightCurveReview from "./LightCurveTool";
import { QuestionLabel } from "@/components/questions/Widget/styles";
import * as Styled from "../styles";
import { WidgetInput } from "@/types/answers";
import { BaseReviewProps } from "@/types/questions";
import useAnswer from "@/hooks/useAnswer";
import ErrorBoundary from "@/components/atomic/ErrorBoundary";

export interface WidgetReviewWrapperProps extends BaseReviewProps {
  id: string;
  instructions: string;
  questionWidgetsBlock: Array<{ typeHandle: string; [key: string]: any }>;
}

export interface WidgetReviewProps<T = any, P = any> {
  data: T;
  id: string;
  value?: P;
}

export const WIDGET_MAP: Record<string, ComponentType<WidgetReviewProps>> = {
  questionWidgetsBlock_colorFilterToolBlock_BlockType: ColorFilterToolReview,
  questionWidgetsBlock_sourceSelectorBlock_BlockType: SourceSelectorReview,
  questionWidgetsBlock_lightCurveBlock_BlockType: LightCurveReview,
};

const WidgetReviewWrapper: FunctionComponent<WidgetReviewWrapperProps> = ({
  id,
  number,
  instructions,
  questionWidgetsBlock,
}) => {
  const { __typename, ...widgetConfig } = questionWidgetsBlock[0];
  const Widget = WIDGET_MAP[__typename];
  const { answer = {} } = useAnswer<WidgetInput>(id);

  if (!Widget) {
    console.error(
      `"${__typename}" is not a valid input for this question type.`
    );

    return null;
  }

  return (
    <Styled.ReviewListItem value={number}>
      <QuestionLabel dangerouslySetInnerHTML={{ __html: instructions }} />
      <Styled.PrintWrapper>
        <ErrorBoundary>
          <Widget data={widgetConfig} value={answer} {...{ id }} />
        </ErrorBoundary>
      </Styled.PrintWrapper>
    </Styled.ReviewListItem>
  );
};

WidgetReviewWrapper.displayName = "Review.Widget.Wrapper";

export default WidgetReviewWrapper;
