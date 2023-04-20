import { Meta, StoryFn, StoryObj } from "@storybook/react";

import WidgetContainer from ".";
import TabbedSelector from "@/layout/TabbedSelector";
import { FilterTool } from "@rubin-epo/epo-widget-lib";
import { useState } from "react";
import withModal from "@/components/hoc/withModal/withModal";

const meta: Meta<typeof WidgetContainer> = {
  component: WidgetContainer,
  argTypes: {
    children: {
      control: "none",
    },
    title: {
      description: "Title of the widget displayed in container",
      table: { type: { summary: "string" }, category: "Display" },
    },
    caption: {
      description: "Caption shown beneath the widget in container",
      table: { type: { summary: "string" }, category: "Display" },
    },
    hasModal: {
      description:
        "Indicates if there is a modal available and will toggle display of the modal button.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true },
        category: "Display",
      },
    },
    isOpen: {
      description: "Indicates if the widget is currently opened in a modal.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
        category: "Display",
      },
    },
    openModal: {
      description: "Callback that will open the modal.",
      table: { type: { summary: "() => void" }, category: "Function" },
    },
    bgColor: {
      control: "select",
      options: ["white", "gray"],
      description: "Color of the panel that the widget is displayed in.",
      table: {
        type: { summary: "white | gray" },
        defaultValue: { summary: "white" },
        category: "Styling",
      },
    },
    paddingSize: {
      control: "select",
      options: ["small", "medium", "large", "none"],
      description: "Padding of the container that the widget is idsplayed in.",
      table: {
        type: { summary: "small | medium | large | none" },
        defaultValue: { summary: "small" },
        category: "Styling",
      },
    },
  },
};

export default meta;

const TabbedExample: StoryFn<typeof WidgetContainer> = (args) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const colors = ["violet", "blue", "green", "yellow", "orange", "red", "none"];
  const selectedColor = colors[activeIndex];

  return (
    <WidgetContainer {...args}>
      <TabbedSelector
        tabs={colors.map((color) => ({
          icon: "Cloud",
          label: color,
        }))}
        activeIndex={activeIndex}
        onChangeCallback={(i) => setActiveIndex(i)}
      >
        <FilterTool selectedColor={selectedColor as any} />
      </TabbedSelector>
    </WidgetContainer>
  );
};

const TabbedWithModal = withModal(TabbedExample);

export const Primary: StoryObj<typeof WidgetContainer> = {
  args: {
    title: "Filter Tool",
    caption: "Captions for this widget go here.",
    children: <FilterTool />,
    hasModal: true,
    isOpen: false,
  },
};

export const CompleteExample: StoryObj<typeof WidgetContainer> =
  TabbedWithModal.bind({});

CompleteExample.args = {
  title: "Filter Tool",
  caption: "Captions for this widget go here.",
  bgColor: "gray",
};
