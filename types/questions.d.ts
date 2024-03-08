import { Equation } from "./calculators";

type Text = "text";
type Textarea = "textarea";
type Select = "select";
type Multiselect = "multiselect";
type Multipart = "multiPart";
type Tabular = "tabular";
type Widget = "widget";
type Readonly = "readonlyText";
type Calculator = "calculator";

export type SimpleQuestionType = Text | Textarea | Select | Widget;

export type InlineQuestionType = Text | Select | Multiselect | Readonly;

export type TabularQuestionType = TextQuestion | SelectQuestion;

export type AnswerType = SimpleQuestionType | Calculator | Multipart | Tabular;

export interface BaseQuestionProps {
  id: string;
  isDisabled?: boolean;
}

export interface BaseReviewProps extends Omit<BaseQuestionProps, "isDisabled"> {
  number: number;
}

export interface QuestionConfig<T = AnswerType> {
  answerType: T;
  id: string;
  questionText: string;
}

export interface CalculatorConfig extends QuestionConfig<Calculator> {
  equation: Equation;
}

export interface TabularConfig extends QuestionConfig<Tabular> {
  rows: Array<Cell>;
}

export interface SelectConfig extends QuestionConfig<Select> {
  options: Array<Option>;
}

export interface WidgetConfig
  extends Omit<QuestionConfig<Widget>, "questionText"> {
  questionWidgetsBlock: Array<any>;
  widgetInstructions: string;
}

export interface MultipartConfig
  extends Omit<QuestionConfig<Multipart>, "questionText"> {
  parts: Array<any>;
}
