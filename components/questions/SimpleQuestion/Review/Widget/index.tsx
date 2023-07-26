"use client";
import { ComponentType, FunctionComponent } from "react";
import FilterTool from "@rubin-epo/epo-widget-lib/FilterTool";
import * as Styled from "./styles";

export interface SimpleWidgetProps {
  id: string;
  value?: string;
  widgetConfig: { type: "filterTool"; [key: string]: any };
}

const WIDGET_MAP: Record<string, ComponentType<any>> = {
  filterTool: FilterTool,
};

const SimpleWidget: FunctionComponent<SimpleWidgetProps> = ({
  id,
  value,
  widgetConfig,
}) => {
  const { type } = widgetConfig;
  const Widget = WIDGET_MAP[type];

  if (!Widget) {
    console.error(`"${type}" is not a valid input for this question type.`);

    return null;
  }

  return (
    <Styled.Container>
      <Widget
        isDisabled={true}
        isReadOnly={true}
        {...{ id, value, ...widgetConfig }}
      />
    </Styled.Container>
  );
};

SimpleWidget.displayName = "Questions.Review.Widget";

export default SimpleWidget;
