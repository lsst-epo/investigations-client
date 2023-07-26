"use client";
import { ComponentType, FunctionComponent, useState } from "react";
import FilterToolContainer from "./containers/FilterToolContainer";
import * as Styled from "./styles";

export interface SimpleWidgetProps {
  id: string;
  value?: string;
  isDisabled?: boolean;
  onChangeCallback: (value: string) => void;
  widgetConfig: { type: "filterTool"; [key: string]: any };
}

const WIDGET_MAP: Record<string, ComponentType<any>> = {
  filterTool: FilterToolContainer,
};

const SimpleWidget: FunctionComponent<SimpleWidgetProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
  widgetConfig,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { type } = widgetConfig;
  const Widget = WIDGET_MAP[type];
  const title = undefined; // figure out where in the props to put a widget title

  if (!Widget) {
    console.error(`"${type}" is not a valid input for this question type.`);

    return null;
  }

  return (
    <Styled.Container
      paddingSize="none"
      title={title}
      isOpen={modalOpen}
      openModal={() => setModalOpen(true)}
      closeModal={() => setModalOpen(false)}
    >
      <Widget {...{ id, value, isDisabled, onChangeCallback, widgetConfig }} />
    </Styled.Container>
  );
};

SimpleWidget.displayName = "Questions.Simple.Widget";

export default SimpleWidget;
