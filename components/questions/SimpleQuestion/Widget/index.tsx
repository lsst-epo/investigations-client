import { ComponentType, FunctionComponent } from "react";
import ColorFilterToolQuestion from "./ColorFilterTool";

export interface SimpleWidgetProps {
  id: string;
  value?: any;
  isDisabled?: boolean;
  onChangeCallback: (value: any) => void;
  widgetConfig: { typeHandle: string; __typename: string; [key: string]: any };
}

const WIDGET_MAP: Record<string, ComponentType<any>> = {
  colorFilterToolBlock: ColorFilterToolQuestion,
};

const SimpleWidget: FunctionComponent<SimpleWidgetProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
  widgetConfig,
}) => {
  const { typeHandle } = widgetConfig;
  const Widget = WIDGET_MAP[typeHandle];

  if (!Widget) {
    console.error(`"${typeHandle}" is not a valid input for this widget type.`);

    return null;
  }

  return (
    <Widget
      data={widgetConfig}
      {...{ id, value, isDisabled, onChangeCallback }}
    />
  );
};

SimpleWidget.displayName = "Questions.Simple.Widget";

export default SimpleWidget;
