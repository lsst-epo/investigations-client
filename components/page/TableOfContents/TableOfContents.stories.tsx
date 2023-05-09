import { Meta, StoryObj } from "@storybook/react";

import TableOfContents from ".";

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  argTypes: {
    sections: {
      description: "Array of section objects.",
      table: {
        type: { summary: "{title: string, pages: PageNavigation[]}[]" },
      },
    },
    questions: {
      description: "Total number of questions.",
      table: {
        type: { summary: "number" },
      },
    },
    answered: {
      description: "Number of questions answered.",
      table: {
        type: { summary: "number" },
      },
    },
    labelledById: {
      description:
        "ID of an element that labels the `nav` element of the table of contents.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;

const sections = [
  {
    title: "Section 1",
    pages: [
      {
        title: "Introduction",
        pageNumber: 1,
        url: "/introduction",
        visited: true,
        disabled: false,
      },
      {
        title: "Types of Light",
        pageNumber: 2,
        url: "/types-of-light",
        visited: true,
        disabled: false,
      },
      {
        title: "Types of Visible Light",
        pageNumber: 3,
        url: "/types-of-visible-light",
        visited: true,
        disabled: false,
      },
      {
        title: "How Filters Work",
        pageNumber: 4,
        url: "/how-filters-work",
        visited: true,
        disabled: false,
      },
      {
        title: "Constructing a Color Image with Three Filters",
        pageNumber: 5,
        url: "/constructing-a-color-image-with-three-filters",
        visited: true,
        disabled: false,
      },
      {
        title: "Constructing an Image with Three Filters",
        pageNumber: 6,
        url: "/constructing-an-image-with-three-filters",
        visited: true,
        disabled: false,
      },
      {
        title: "Colorizing the Images",
        pageNumber: 7,
        url: "/colorizing-the-images",
        visited: true,
        disabled: false,
      },
      {
        title: "Eyes vs. Telescopes - Different Ways of Seeing",
        pageNumber: 8,
        url: "/eyes-vs-telescope",
        visited: true,
        disabled: false,
      },
      {
        title: "Rubin Observatory LSST Camera Filters",
        pageNumber: 9,
        url: "/characterizing-main-belt-asteroids",
        visited: true,
        disabled: false,
      },
      {
        title: "Checkpoint",
        pageNumber: 10,
        url: "/checkpoint-1",
        visited: true,
        checkpoint: true,
        disabled: false,
      },
    ],
  },
  {
    title: "Section 2",
    pages: [
      {
        title: "Uses of Astronomical Filters",
        pageNumber: 11,
        url: "/uses-of-astronomical-filters",
        visited: true,
        disabled: false,
      },
      {
        title: "Seeing Through Dusty Nebulae",
        pageNumber: 12,
        url: "/seeing-through-dusty-nebulae",
        visited: true,
        disabled: false,
      },
      {
        title: "Detecting Far Away Galaxies",
        pageNumber: 13,
        url: "/detecting-far-away-galaxies",
        visited: true,
        disabled: false,
      },
      {
        title: "Exploring Spiral Galaxies",
        pageNumber: 14,
        url: "/identifying-groups-4",
        visited: false,
        disabled: true,
      },
      {
        title: "Checkpoint",
        pageNumber: 15,
        url: "/checkpoint-2",
        visited: false,
        checkpoint: true,
        disabled: true,
      },
    ],
  },
  {
    title: "Section 3",
    pages: [
      {
        title: "Color in Astronomical Images",
        pageNumber: 16,
        url: "/color-in-astronomical-images",
        visited: false,
        disabled: true,
      },
      {
        title: "Checkpoint",
        pageNumber: 17,
        url: "/checkpoint-2",
        visited: false,
        checkpoint: true,
        disabled: true,
      },
    ],
  },
  {
    title: "Section 4",
    pages: [
      {
        title: "Constructing an Astronomical Image",
        pageNumber: 18,
        url: "/constructing-an-astronomical-image",
        visited: false,
        disabled: true,
      },
      {
        title: "Color Balancing an Image",
        pageNumber: 19,
        url: "/color-balancing-an-image",
        visited: false,
        disabled: true,
      },
      {
        title: "Connecting Wavelengths, Colors, and Astronomical Objects",
        pageNumber: 20,
        url: "/connecting-wavelengths",
        visited: false,
        disabled: true,
      },
      {
        title: "Creating a Galaxy Image",
        pageNumber: 21,
        url: "/creating-a-galaxy-image",
        visited: false,
        disabled: true,
      },
      {
        title: "Checkpoint",
        pageNumber: 22,
        url: "/checkpoint-3",
        visited: false,
        checkpoint: true,
        disabled: true,
      },
    ],
  },
  {
    title: "Section 5",
    pages: [
      {
        title: "Putting it all Together",
        pageNumber: 23,
        url: "/putting-it-all-together",
        visited: false,
        disabled: true,
      },
      {
        title: "Creating Your Astronomical Image",
        pageNumber: 24,
        url: "/creating-your-astronomical-image",
        visited: false,
        disabled: true,
      },
      {
        title: "Describing Your Process",
        pageNumber: 25,
        url: "/describing-your-process",
        visited: false,
        disabled: true,
      },
      {
        title: "Reflect and Discuss",
        pageNumber: 26,
        url: "/reflect-and-discuss",
        visited: false,
        disabled: true,
      },
      {
        title: "Finish",
        pageNumber: 27,
        url: "/finish",
        visited: false,
        disabled: true,
        final: true,
      },
    ],
  },
];

export const Primary: StoryObj<typeof TableOfContents> = {
  args: {
    sections,
    questions: 58,
    answered: 23,
  },
  parameters: {
    nextjs: {
      router: {
        pathname: "/detecting-far-away-galaxies",
      },
    },
  },
};
