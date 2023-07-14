import { FunctionComponent } from "react";
import QuestionFactory, {
  QuestionProps,
} from "@/components/factories/QuestionFactory";
import * as Styled from "./styles";
const QuestionsContentBlock: FunctionComponent = () => {
  const isInteraction = true;
  const questions: QuestionProps[] = [
    {
      id: "inlineQuestionOne",
      category: "inline",
      config: {
        number: 3,
        parts: [
          {
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
          { type: "readonly", text: "the Sun,  and will have a " },
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
        number: 4,
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
    {
      id: "simpleSelectQuestion",
      category: "simple",
      config: {
        number: 5,
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
  ];

  return (
    <Styled.QuestionList
      style={{
        "--list-background-color": isInteraction && "#E6FFE6",
        "--list-padding": isInteraction && "var(--PADDING_SMALL, 20px)",
      }}
    >
      {questions.map((question) => (
        <QuestionFactory key={question.id} {...question} />
      ))}
    </Styled.QuestionList>
  );
};

QuestionsContentBlock.displayName = "ContentBlock.Questions";

export default QuestionsContentBlock;
