import { Meta, StoryObj } from "@storybook/react";

import Text from ".";

const meta: Meta<typeof Text> = {
  component: Text,
  argTypes: {
    text: {
      description:
        "Plaintext or HTML to be displayed within the content block.",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof Text> = {
  args: { text: "<p>Some text</p>" },
};
