import { FunctionComponent } from "react";
import QuestionFactory, {
  QuestionProps,
} from "@/components/factories/QuestionFactory";
import * as Styled from "./styles";
const QuestionsContentBlock: FunctionComponent = () => {
  const isInteraction = true;
  const questions: QuestionProps[] = [
    {
      id: "simpleTextQuestion",
      category: "simple",
      config: {
        number: 1,
        type: "text",
        questionText:
          "What do you think expansion can reveal about the Universe?",
      },
    },
    {
      id: "simpleTextareaQuestion",
      category: "simple",
      config: {
        number: 2,
        type: "textarea",
        questionText:
          "When you first started making your image, it may not have looked as you expected. What didn’t work? What changes or adjustments did you have to make in order to create a color balanced image that effectively answered your research question?",
      },
    },
    {
      id: "simpleSelectQuestion",
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
      id: "simpleMultiselectQuestion",
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
          "To better understand how filters work, try out the filter tool. Select a filter from the dropdown menu and observe the effect that filter has on the light coming out of the prism.",
        widgetConfig: {
          type: "filterTool",
        },
        value: "none",
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
