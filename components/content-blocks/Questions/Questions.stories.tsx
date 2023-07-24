import { Meta, StoryObj } from "@storybook/react";

import QuestionsContentBlock from ".";

const meta: Meta<typeof QuestionsContentBlock> = {
  component: QuestionsContentBlock,
  argTypes: {
    questions: {
      control: "none",
      type: {
        name: "other",
        value: "QuestionProps[]",
        required: true,
      },
      description: "Array of objects defining the table header elements",
      table: {
        type: { summary: "QuestionProps[]" },
      },
    },
    interaction: {
      control: "boolean",
      description: "Array of rows containing arrays of table cells",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;
export const SimpleQuestions: StoryObj<typeof QuestionsContentBlock> = {
  args: {
    questions: [
      {
        id: "simpleTextQuestions",
        category: "simple",
        config: {
          number: 1,
          type: "text",
          questionText:
            "How do the range of values for the inclination for the small objects of the Solar System support the nebular theory?",
        },
      },
      {
        id: "simpleTextareaQuestions",
        category: "simple",
        config: {
          number: 2,
          type: "textarea",
          questionText:
            "When you first started making your image, it may not have looked as you expected. What didn’t work? What changes or adjustments did you have to make in order to create a color balanced image that effectively answered your research question?",
        },
      },
      {
        id: "simpleSelectQuestions",
        category: "simple",
        config: {
          number: 3,
          type: "select",
          questionText:
            "In which filter is the active star forming region most clearly defined?",
          options: [
            { value: "u", label: "u filter" },
            { value: "g", label: "g filter" },
            { value: "r", label: "r filter" },
            { value: "i", label: "i filter" },
            { value: "z", label: "z filter" },
            { value: "y", label: "y filter" },
          ],
        },
      },
      {
        id: "simpleMultiselectQuestions",
        category: "simple",
        config: {
          number: 4,
          type: "multiselect",
          questionText:
            "In which filter is the active star forming region most clearly defined?",
          options: [
            { value: "u", label: "u filter" },
            { value: "g", label: "g filter" },
            { value: "r", label: "r filter" },
            { value: "i", label: "i filter" },
            { value: "z", label: "z filter" },
            { value: "y", label: "y filter" },
          ],
        },
      },
      {
        id: "simpleWidgetQuestion",
        category: "simple",
        config: {
          number: 5,
          type: "widget",
          questionText:
            "In which filter is the active star forming region most clearly defined?",
          widgetConfig: { type: "filterTool" },
        },
      },
    ],
  },
};
export const InlineQuestions: StoryObj<typeof QuestionsContentBlock> = {
  args: {
    questions: [
      {
        id: "inlineQuestionOne",
        category: "inline",
        config: {
          number: 1,
          parts: [
            {
              id: "asdfsdfsdf",
              type: "readonly",
              text: "The object that takes a longer time to move across the field of view is",
            },
            {
              id: "sdfdsf",
              type: "select",
              options: [
                { value: "closer", label: "closer to" },
                { value: "farther", label: "farther from" },
              ],
            },
            {
              id: "asdfsdfffsdf",
              type: "readonly",
              text: "the Sun,  and will have a ",
            },
            {
              id: "dfdssss",
              type: "select",
              options: [
                { value: "long", label: "long" },
                { value: "short", label: "short" },
              ],
            },
          ],
        },
      },
      {
        id: "inlineQuestionTwo",
        category: "inline",
        config: {
          number: 2,
          parts: [
            {
              type: "readonly",
              text: "Measuring the peak luminosity of a Type Ia supernova allows us to calculate the",
            },
            {
              id: "aaasdasdasd",
              type: "text",
            },
            { type: "readonly", text: "of its host galaxy." },
          ],
        },
      },
    ],
  },
};
export const TabularQuestions: StoryObj<typeof QuestionsContentBlock> = {
  args: {
    questions: [
      {
        id: "tabularQuestion",
        category: "tabular",
        config: {
          number: 1,
          type: "select",
          header: [
            { children: "Group" },
            { children: "Size of Orbit" },
            { children: "Eccentricity" },
            { children: "Inclination" },
            { children: "Direction of Orbit" },
          ],
          rowHeader: ["NEOs", "MBAs", "TNOs", "Comets"],
          questionRows: [
            [
              {
                id: "neosSizeOfOrbit",
                type: "select",
                value: "Span inner and outer Solar System (beyond 30 au)",
                options: [
                  {
                    label:
                      "All of the orbits are within the inner Solar System (between 0.5 - 4 au).",
                    value: "Within inner Solar System (between 0.5 - 4 au)",
                  },
                  {
                    label:
                      "All of the orbits are within the inner Solar System (between 1.5 - 5.2 au).",
                    value: "Within inner Solar System (between 1.5 - 5.2 au)",
                  },
                  {
                    label:
                      "The orbit sizes are 30 au or larger, and objects typically orbit beyond Neptune.",
                    value: "In the outer Solar System (30 au or larger)",
                  },
                  {
                    label:
                      "The orbit sizes span both the inner and outer Solar System, beyond 30 au.",
                    value: "Span inner and outer Solar System (beyond 30 au)",
                  },
                ],
              },
              {
                id: "neosEccentricity",
                type: "select",
                value: "Wide range of shapes",
                options: [
                  {
                    label:
                      "Most orbits are similar to the shape of Earth’s orbit  (0.0 - 0.3)",
                    value: "Similar to Earth’s (0.0 - 0.3)",
                  },
                  {
                    label:
                      "Most orbits are noticeably more elliptical than the shape of Earth’s orbit (greater than 0.3)",
                    value: "More elliptical than Earth’s (greater than 0.3)",
                  },
                  {
                    label:
                      "There is an equal distribution across all shapes of orbits",
                    value: "Wide range of shapes",
                  },
                ],
              },
              {
                id: "neosInclination",
                type: "select",
                value: "Wide range in tilts",
                options: [
                  {
                    label:
                      "Most orbits are similar to the tilt of Earth’s orbital plane (0-20°).",
                    value: "Similar to Earth’s (0-20°)",
                  },
                  {
                    label:
                      "Most orbits are tilted compared to Earth’s orbital plane (more than 20°).",
                    value: "More tilted than Earth's (more than 20°)",
                  },
                  {
                    label:
                      "There is an equal distribution across all tilts of the orbits.",
                    value: "Wide range in tilts",
                  },
                ],
              },
              {
                id: "neosDirectionOfOrbit",
                type: "select",
                value: "Opposite direction as Earth’s (i >90°)",
                options: [
                  {
                    label:
                      "Almost all objects orbit the Sun in the same direction as Earth’s orbit.",
                    value: "Same direction as Earth’s",
                  },
                  {
                    label:
                      "More than 10% of the objects orbit the Sun in the opposite direction of Earth’s orbit (i >90°).",
                    value: "Opposite direction as Earth’s (i >90°)",
                  },
                ],
              },
            ],
            [
              { id: "mbasSizeOfOrbit", type: "text" },
              { id: "mbasEccentricity", type: "text" },
              { id: "mbasInclination", type: "text" },
              { id: "mbasDirectionOfOrbit", type: "text" },
            ],
            [
              { id: "tnosSizeOfOrbit", type: "text" },
              { id: "tnosEccentricity", type: "text" },
              { id: "tnosInclination", type: "text" },
              { id: "tnosDirectionOfOrbit", type: "text" },
            ],
            [
              { id: "cometsSizeOfOrbit", type: "text" },
              { id: "cometsEccentricity", type: "text" },
              { id: "cometsInclination", type: "text" },
              { id: "cometsDirectionOfOrbit", type: "text" },
            ],
          ],
        },
      },
    ],
  },
};
