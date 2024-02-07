import { ComponentType, FunctionComponent } from "react";
import { WidgetInput } from "@/types/answers";
import ColorFilterToolQuestion from "./ColorFilterTool";
import SourceSelectorQuestion from "./SourceSelector";

export interface SimpleWidgetProps<T = WidgetInput> {
  id: string;
  value?: T;
  isDisabled?: boolean;
  onChangeCallback: (value: T) => void;
  questionText: string;
  widgetConfig: { typeHandle: string; __typename: string; [key: string]: any };
}

const WIDGET_MAP: Record<string, ComponentType<any>> = {
  colorFilterToolBlock: ColorFilterToolQuestion,
  sourceSelector: SourceSelectorQuestion,
};

const SimpleWidget: FunctionComponent<SimpleWidgetProps> = ({
  widgetConfig,
  ...props
}) => {
  const { typeHandle } = widgetConfig;
  const Widget = WIDGET_MAP[typeHandle];

  if (!Widget) {
    console.error(`"${typeHandle}" is not a valid input for this widget type.`);

    return null;
  }

  return <Widget data={widgetConfig} {...props} />;
};

SimpleWidget.displayName = "Questions.Simple.Widget";

export default SimpleWidget;
