import { Meta, StoryObj } from "@storybook/react";

import Pager from ".";

const meta: Meta<typeof Pager> = {
  component: Pager,
  argTypes: {
    isLeftDisabled: {
      control: "boolean",
      description: "Disables the left button",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    isRightDisabled: {
      control: "boolean",
      description: "Disables the right button",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    leftText: {
      control: "text",
      description: "Text to display on the left button",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "Previous page",
        },
      },
    },
    rightText: {
      control: "text",
      description: "Text to display on the right button",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "Next page",
        },
      },
    },
    leftLink: {
      type: {
        name: "string",
        required: true,
      },
      control: "text",
      description: "Internal link for the left button",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    rightLink: {
      type: {
        name: "string",
        required: true,
      },
      control: "text",
      description: "Internal link for the right button",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    currentPage: {
      type: {
        name: "number",
        required: true,
      },
      control: { type: "number", min: 1 },
      description: "Current page in navigation",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    totalPages: {
      type: {
        name: "number",
        required: true,
      },
      control: { type: "number", min: 1 },
      description: "Total pages navigable",
      table: {
        type: {
          summary: "number",
        },
      },
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof Pager> = {
  args: {
    leftLink: "/previous-page",
    leftText: "Previous page",
    rightLink: "/next-page",
    rightText: "Next page",
    currentPage: 1,
    totalPages: 35,
  },
};
