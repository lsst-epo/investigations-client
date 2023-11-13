"use client";
import { ComponentType, FunctionComponent } from "react";
import ColorFilterToolReview from "./ColorFilterTool";
import * as Styled from "./styles";
import { WidgetInput } from "@/types/answers";

export interface SimpleWidgetProps {
  id: string;
  value?: WidgetInput;
  widgetInstructions: string;
  questionWidgetsBlock: Array<{ typeHandle: string; [key: string]: any }>;
}

const WIDGET_MAP: Record<string, ComponentType<any>> = {
  colorFilterToolBlock: ColorFilterToolReview,
};

const SimpleWidget: FunctionComponent<SimpleWidgetProps> = ({
  id,
  value,
  widgetInstructions,
  questionWidgetsBlock,
}) => {
  const { typeHandle, ...widgetConfig } = questionWidgetsBlock[0];
  const Widget = WIDGET_MAP[typeHandle];

  console.log({ widgetConfig });

  if (!Widget) {
    console.error(
      `"${typeHandle}" is not a valid input for this question type.`
    );

    return null;
  }

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: widgetInstructions }} />
      <Widget data={widgetConfig} {...{ id, value }} />
    </>
  );
};

SimpleWidget.displayName = "Questions.Review.Widget";

export default SimpleWidget;
