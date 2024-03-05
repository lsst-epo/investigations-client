export type TextQuestion = "text";
export type TextAreaQuestion = "textarea";
export type SelectQuestion = "select";
export type MultiselectQuestion = "multiselect";
export type Readonly = "readonlyText";

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
  isDisabled?: boolean;
}

export type BaseReviewProps = Omit<BaseQuestionProps, "isDisabled">;
