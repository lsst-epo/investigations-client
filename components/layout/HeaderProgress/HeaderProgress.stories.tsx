import { Meta, StoryObj } from "@storybook/react";

import HeaderProgress from ".";

const meta: Meta<typeof HeaderProgress> = {
  component: HeaderProgress,
  argTypes: {
    currentPage: {
      control: "number",
      description: "The current page.",
      table: { category: "Model" },
    },
    totalPages: {
      control: "number",
      description: "Total count of available pages.",
      table: { category: "Model" },
    },
    sections: {
      control: "object",
      description: "Sections in the investigations",
      table: {
        type: { summary: "{name: string; order: number; pages: number[]}[]" },
        category: "Model",
      },
    },
    labelledById: {
      control: "text",
      description: "ID of an element that labels this progress indicator.",
      table: { category: "Accessibility" },
    },
  },
};

export default meta;

const sections = [
  { name: "Section 1", order: 1, pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { name: "Section 2", order: 2, pages: [11, 12, 13, 14, 15] },
  { name: "Section 3", order: 3, pages: [16, 17] },
  { name: "Section 4", order: 4, pages: [18, 19, 20, 21, 22] },
  { name: "Section 5", order: 5, pages: [23, 24, 25, 26, 27] },
];

export const Primary: StoryObj<typeof HeaderProgress> = {
  args: { sections, totalPages: 27, currentPage: 20 },
};
