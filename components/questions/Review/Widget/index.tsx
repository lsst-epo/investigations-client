"use client";
import { ComponentType, FunctionComponent } from "react";
import ColorFilterToolReview from "./ColorFilterTool";
import { QuestionLabel } from "../../SimpleQuestion/styles";
import * as Styled from "../styles";
import { WidgetInput } from "@/types/answers";
import { BaseReviewProps } from "@/types/questions";

export interface WidgetReviewProps extends BaseReviewProps<WidgetInput> {
  id: string;
  widgetInstructions: string;
  questionWidgetsBlock: Array<{ typeHandle: string; [key: string]: any }>;
}

const WIDGET_MAP: Record<string, ComponentType<any>> = {
  colorFilterToolBlock: ColorFilterToolReview,
};

const WidgetReview: FunctionComponent<WidgetReviewProps> = ({
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
      <Widget data={widgetConfig} {...{ id, value }} />
    </Styled.ReviewListItem>
  );
};

WidgetReview.displayName = "Review.Widget";

export default WidgetReview;
