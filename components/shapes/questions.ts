type SimpleQuestion = "simple";
type InlineQuestion = "inline";
type WidgetQuestion = "widget";
type TabularQuestion = "tabular";

export type QuestionCategory =
  | SimpleQuestion
  | InlineQuestion
  | WidgetQuestion
  | TabularQuestion;

export type TextQuestion = "text";
export type TextAreaQuestion = "textarea";
export type SelectQuestion = "select";
export type MultiselectQuestion = "multiselect";
export type Readonly = "readonly";

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

export type TabularQuestionType = TextQuestion | SelectQuestion;

export interface BaseQuestionProps {
  id: string;
  number: number;
  isDisabled?: boolean;
}

export type BaseReviewProps = Pick<BaseQuestionProps, "number">;
