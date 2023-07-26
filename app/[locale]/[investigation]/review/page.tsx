import { PropsWithChildren } from "react";
import { ReviewPageProps } from "./layout";
import ReviewFactory, {
  ReviewProps,
} from "@/components/factories/ReviewFactory";
import Input from "@/components/form/Input";
import * as Styled from "./styles";

const getReviewQuestions = async (): Promise<ReviewProps[]> => [
  {
    id: "simpleTextReview",
    category: "simple",
    config: {
      type: "text",
      questionText:
        "What can different wavelengths of light reveal about astronomical objects?",
      value: "Their distance",
      number: 1,
    },
  },
  {
    id: "simpleTextReviewNoSelection",
    category: "simple",
    config: {
      type: "text",
      questionText:
        "Choose the violet filter. What color of light passes through the violet filter?",
      number: 2,
    },
  },
  {
    id: "simpleTextareaReview",
    category: "simple",
    config: {
      type: "textarea",
      questionText:
        "When you first started making your image, it may not have looked as you expected. What didn’t work? What changes or adjustments did you have to make in order to create a color balanced image that effectively answered your research question?",
      value:
        "Some very long response here, need to make it nice and long so we can see the lines wrap and stuff. Bla hb lah blah blabh lbhalbh bla hb lah blah blabh lbhalbh bla hb lah blah blabh lbhalbh bla hb lah blah blabh lbhalbh bla hb lah blah blabh lbhalbh bla hb lah blah blabh lbhalbh bla hb lah blah blabh lbhalbh",
      number: 3,
    },
  },
  {
    id: "simpleSelectReview",
    category: "simple",
    config: {
      type: "select",
      questionText:
        "Objects in space can emit many different wavelengths of light, from gamma-rays to radio. If you had access to filters for all the different wavelengths of light and wanted to observe the ultraviolet light from an object in space, what filter would you use?",
      value: "Ultraviolet",
      number: 4,
    },
  },
  {
    id: "simpleSelectReviewNoSelection",
    category: "simple",
    config: {
      type: "select",
      questionText:
        "In which filter is the active star forming region most clearly defined?",
      number: 5,
    },
  },
  {
    id: "simpleMultiselectReview",
    category: "simple",
    config: {
      type: "multiselect",
      questionText:
        "I am a multi-select, select everything that applies! I don't know where a simple multi-select like this actually exists in any investigations.",
      value: [
        "u",
        "g",
        "r",
        "i",
        "z",
        "y",
        "a really loooooooooooooong answer",
      ],
      number: 6,
    },
  },
  {
    id: "simpleMultiselectReviewNoSelection",
    category: "simple",
    config: {
      type: "multiselect",
      questionText:
        "I am a multi-select, select everything that applies! I don't know where a simple multi-select like this actually exists in any investigations.",
      number: 7,
    },
  },
  {
    id: "simpleWidgetReview",
    category: "simple",
    config: {
      type: "widget",
      questionText:
        "To better understand how filters work, try out the filter tool. Select a filter from the dropdown menu and observe the effect that filter has on the light coming out of the prism.",
      value: "violet",
      number: 8,
      widgetConfig: {
        type: "filterTool",
      },
    },
  },
  {
    id: "inlineReview",
    category: "inline",
    config: {
      number: 9,
      parts: [
        { type: "readonly", value: "The red shirt looks" },
        { type: "select", value: "white" },
        {
          type: "readonly",
          value: "in the image taken through the red filter, and looks",
        },
        {
          type: "select",
          value: "gray",
        },
        {
          type: "readonly",
          value:
            "in the image taken through the blue filter, because the red filter",
        },
        {
          type: "select",
          value: "allows",
        },
        {
          type: "readonly",
          value: "red light, and the blue filter",
        },
        {
          type: "select",
          value: "blocks",
        },
        {
          type: "readonly",
          value: "red light.",
        },
      ],
    },
  },
  {
    id: "inlineReviewMultiselect",
    category: "inline",
    config: {
      number: 10,
      parts: [
        {
          type: "readonly",
          value: "What four colors of light are transmitted by the r filter?",
        },
        { type: "multiselect", value: ["red", "orange", "yellow", "green"] },
      ],
    },
  },
  {
    id: "inlineReviewMultiselectNoAnswer",
    category: "inline",
    config: {
      number: 11,
      parts: [
        {
          type: "readonly",
          value: "What two filters transmit green light?",
        },
        { type: "multiselect" },
      ],
    },
  },
  {
    id: "inlineReviewNoAnswer",
    category: "inline",
    config: {
      number: 12,
      parts: [
        { type: "readonly", value: "The" },
        {
          type: "text",
        },
        {
          type: "readonly",
          value: "filter transmits the shortest wavelength of light which are",
        },
        {
          type: "select",
        },
        {
          type: "readonly",
          value: "light.",
        },
      ],
    },
  },
];

const ReviewPage: (
  props: PropsWithChildren<ReviewPageProps>
) => Promise<JSX.Element> = async () => {
  const reviewQuestions = await getReviewQuestions();
  const nameInputId = "name";

  return (
    <Styled.PageContainer>
      <h1>Great job! Let’s review your answers.</h1>
      <form>
        <Styled.NameLabel htmlFor={nameInputId}>
          Please enter your name
        </Styled.NameLabel>
        <Input type="text" id={nameInputId} />
      </form>
      <h2>Questions & Answers</h2>
      <Styled.ReviewList>
        {reviewQuestions &&
          reviewQuestions.map((review) => (
            <ReviewFactory key={review.id} {...review} />
          ))}
      </Styled.ReviewList>
    </Styled.PageContainer>
  );
};

export default ReviewPage;
