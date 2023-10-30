type QuestionId = string;

export type InvestigationId = string | null | undefined;

export type TextInput = string;
export type SelectInput = string;
export type MultiselectInput = Array<SelectInput>;
export type WidgetInput = object;

export type SimpleQuestionData =
  | TextInput
  | SelectInput
  | MultiselectInput
  | WidgetInput;

export type InlineQuestionData = {
  [key: QuestionId]: TextInput | SelectInput | MultiselectInput;
};

export type AnswerData = SimpleQuestionData | InlineQuestionData;

export interface Answer {
  data: AnswerData;
  id?: string;
  questionId?: QuestionId;
}

export type Answers = {
  [key: QuestionId]: Answer;
};
