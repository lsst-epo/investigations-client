type SimpleQuestion = "simple";
type InlineQuestion = "inline";
type WidgetQuestion = "widget";
type TabularQuestion = "tabular";

export type QuestionCategory =
  | SimpleQuestion
  | InlineQuestion
  | WidgetQuestion
  | TabularQuestion;

type TextQuestion = "text";
type TextAreaQuestion = "textarea";
type SelectQuestion = "select";
type MultiselectQuestion = "multiselect";
type Readonly = "readonly";

export type SimpleQuestionType =
  | TextQuestion
  | TextAreaQuestion
  | SelectQuestion
  | MultiselectQuestion
  | WidgetQuestion;

export type InlineQuestionType =
  | TextQuestion
  | SelectQuestion
  | MultiselectQuestion
  | Readonly;

export interface BaseQuestionProps {
  id: string;
  number: number;
  isDisabled?: boolean;
}
