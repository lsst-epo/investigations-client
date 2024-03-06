type Text = "text";
type Textarea = "textarea";
type Select = "select";
type Multiselect = "multiselect";
type Multipart = "multiPart";
type Tabular = "tabular";
type Widget = "widget";
type Readonly = "readonlyText";

export type SimpleQuestionType =
  | Text
  | Textarea
  | Select
  | Multiselect
  | Widget;

export type InlineQuestionType = Text | Select | Multiselect | Readonly;

export type TabularQuestionType = TextQuestion | SelectQuestion;

export type AnswerType = SimpleQuestionType | Multipart | Tabular;

export interface BaseQuestionProps {
  id: string;
  isDisabled?: boolean;
}

export interface BaseReviewProps extends Omit<BaseQuestionProps, "isDisabled"> {
  number: number;
}

export interface QuestionConfig {
  answerType: AnswerType;
  id: string;
  questionText: string;
}

export interface TabularConfig extends QuestionConfig {
  rows: Array<Cell>;
}

export interface SelectConfig extends QuestionConfig {
  options: Array<Option>;
}

export interface WidgetConfig extends Omit<QuestionConfig, "questionText"> {
  questionWidgetsBlock: Array<any>;
  widgetInstructions: string;
}

export interface MultipartConfig extends Omit<QuestionConfig, "questionText"> {
  parts: Array<any>;
}
