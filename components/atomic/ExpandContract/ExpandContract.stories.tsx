import { Meta, StoryObj } from "@storybook/react";

import ExpandContract from ".";

const meta: Meta<typeof ExpandContract> = {
  component: ExpandContract,
  argTypes: {
    isOpen: { control: "boolean" },
    onToggle: { action: "Toggled" },
    controlsId: { control: "text" },
  },
};
export default meta;

export const Primary: StoryObj<typeof ExpandContract> = {
  args: {},
};
