import { Meta, StoryObj } from "@storybook/react";

import Table from ".";

const meta: Meta<typeof Table> = {
  component: Table,
  argTypes: {
    header: {
      control: "none",
      description: "Array of objects defining the table header elements",
    },
    rows: {
      control: "none",
      description: "Array of rows containing arrays of table cells",
    },
    caption: {
      description: "Accessible caption describing the table",
      control: "text",
    },
    id: { description: "ID for the table element", control: "text" },
    labelledById: {
      description: "ID of an element that labels the table",
      control: "text",
    },
  },
};

const header = [
  { children: "Group" },
  { children: "Size of Orbit" },
  { children: "Eccentricity" },
  { children: "Inclination" },
  { children: "Direction of Orbit" },
];

const rows = [
  [{ isHeader: true, children: "NEOs" }, {}, {}, {}, {}],
  [{ isHeader: true, children: "MBAs" }, {}, {}, {}, {}],
  [{ isHeader: true, children: "TNOs" }, {}, {}, {}, {}],
  [{ isHeader: true, children: "Comets" }, {}, {}, {}, {}],
];

export default meta;
export const Primary: StoryObj<typeof Table> = { args: { header, rows } };
