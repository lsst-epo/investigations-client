import { Meta, StoryObj } from "@storybook/react";

import Pager from ".";

const meta: Meta<typeof Pager> = {
  component: Pager,
  argTypes: {
    isLeftDisabled: { control: "boolean" },
    isRightDisabled: { control: "boolean" },
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
