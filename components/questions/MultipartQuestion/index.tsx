import { ComponentType, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { MultipartQuestionType } from "@/types/questions";
import Readonly from "./Readonly";
import Text from "./Text";
import Select from "./Select";
import Multiselect from "./Multiselect";
import NumberPart from "./Number";
import QuestionNumber from "../QuestionNumber";

const Fragment = graphql(`
  fragment MultipartQuestion on questions_default_Entry {
    __typename
    id
    answerType
    parts: multiPartBlocks {
      ... on NeoBlockInterface {
        id
        type: typeHandle
      }
      ...SelectPart
      ...MultiselectPart
      ...NumberPart
      ...ReadOnlyPart
    }
  }
`);

export interface PartProps<T = any> {
  data: T;
  id: string;
  questionId: string;
  locale: string;
}

export interface MultipartQuestionProps {
  data: FragmentType<typeof Fragment>;
  id: string;
  locale: string;
}

const INPUT_MAP: Record<MultipartQuestionType, ComponentType<PartProps>> = {
  readonlyText: Readonly,
  text: Text,
  select: Select,
  multiselect: Multiselect,
  number: NumberPart,
};

const MultipartQuestion: FunctionComponent<MultipartQuestionProps> = ({
  data,
  id: questionId,
  locale,
}) => {
  const { parts } = useFragment(Fragment, data);

  if (!parts) return null;

  return (
    <QuestionNumber direction="inline" id={questionId}>
      {parts &&
        parts.map(({ id, type, ...part }) => {
          const Input = INPUT_MAP[type];

          if (!Input || !id) {
            console.error(
              `"${type}" is not a valid input for this question type.`
            );

            return null;
          }

          return <Input key={id} data={part} {...{ id, questionId, locale }} />;
        })}
    </QuestionNumber>
  );
};

MultipartQuestion.displayName = "Questions.Multipart";

export default MultipartQuestion;
