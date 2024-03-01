"use client";
import { ComponentType, FunctionComponent } from "react";
import ColorFilterToolReview from "./ColorFilterTool";
import SourceSelectorReview from "./SourceSelector";
import LightCurveReview from "./LightCurveTool";
import { QuestionLabel } from "../../SimpleQuestion/styles";
import * as Styled from "../styles";
import { WidgetInput } from "@/types/answers";
import { BaseReviewProps } from "@/types/questions";

export interface WidgetReviewWrapperProps extends BaseReviewProps<WidgetInput> {
  id: string;
  widgetInstructions: string;
  questionWidgetsBlock: Array<{ typeHandle: string; [key: string]: any }>;
}

export interface WidgetReviewProps<T = any, P = any> {
  data: T;
  id: string;
  value?: P;
}

export const WIDGET_MAP: Record<string, ComponentType<WidgetReviewProps>> = {
  colorFilterToolBlock: ColorFilterToolReview,
  sourceSelectorBlock: SourceSelectorReview,
  lightCurveBlock: LightCurveReview,
};

const WidgetReviewWrapper: FunctionComponent<WidgetReviewWrapperProps> = ({
  id,
  value,
  number,
  widgetInstructions,
  questionWidgetsBlock,
}) => {
  const { typeHandle, ...widgetConfig } = questionWidgetsBlock[0];
  const Widget = WIDGET_MAP[typeHandle];

  if (!Widget) {
    console.error(
      `"${typeHandle}" is not a valid input for this question type.`
    );

    return null;
  }

  return (
    <Styled.ReviewListItem value={number}>
      <QuestionLabel dangerouslySetInnerHTML={{ __html: widgetInstructions }} />
      <Styled.Widget>
        <Widget data={widgetConfig} {...{ id, value }} />
      </Styled.Widget>
    </Styled.ReviewListItem>
  );
};

WidgetReviewWrapper.displayName = "Review.Widget.Wrapper";

export default WidgetReviewWrapper;
