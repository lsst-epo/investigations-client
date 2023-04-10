import { Meta, StoryObj } from "@storybook/react";

import TextWithModal from "./TextWithModal";

const meta: Meta<typeof TextWithModal> = {
  component: TextWithModal,
  argTypes: {
    text: {
      description:
        "Plaintext or HTML to be displayed within the content block.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof TextWithModal> = {
  args: { text: "<p>Some text</p>" },
};
