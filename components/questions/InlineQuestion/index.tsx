import { ComponentType, FunctionComponent } from "react";
import { Option } from "@/components/shapes/option";
import {
  BaseQuestionProps,
  InlineQuestionType,
} from "@/components/shapes/questions";
import * as Styled from "./styles";
import Readonly from "./Readonly";
import Text from "./Text";
import Select from "./Select";
import Multiselect from "./Multiselect";

interface InlineQuestionPart {
  id: string;
  type: InlineQuestionType;
}

export interface InlineReadonlyPart extends InlineQuestionPart {
  text: string;
}

export type InlineTextPart = InlineQuestionPart;

export interface InlineSelectPart extends InlineQuestionPart {
  options: Option[];
}

export interface InlineMultiselectPart extends InlineQuestionPart {
  options: Option[];
}

export interface InlineQuestionProps extends BaseQuestionProps {
  value?: string | string[];
  parts: Array<
    | InlineReadonlyPart
    | InlineTextPart
    | InlineSelectPart
    | InlineMultiselectPart
  >;
}

const INPUT_MAP: Record<InlineQuestionType, ComponentType<any>> = {
  readonly: Readonly,
  text: Text,
  select: Select,
  multiselect: Multiselect,
};

const InlineQuestion: FunctionComponent<InlineQuestionProps> = ({
  id,
  number,
  isDisabled,
  parts = [],
}) => {
  const callback = (value: string | string[], id: string) => {
    console.info({ value, id });
  };

  return (
    <Styled.InlineContainer value={number}>
      {parts.map(({ id, type, ...props }) => {
        const Input = INPUT_MAP[type];

        if (!Input) {
          console.error(
            `"${type}" is not a valid input for this question type.`
          );

          return null;
        }

        return (
          <Input
            key={id}
            onChangeCallback={callback}
            {...{ ...props, isDisabled, id }}
          />
        );
      })}
    </Styled.InlineContainer>
  );
};

InlineQuestion.displayName = "Questions.Inline";

export default InlineQuestion;
