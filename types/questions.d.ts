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
type NumberQuestion = "number";

export type SimpleQuestionType = Text | Textarea | Select;

export type MultipartQuestionType =
  | Text
  | Select
  | Multiselect
  | Readonly
  | NumberQuestion;

export type TabularQuestionType = Text | Select;

export type AnswerType =
  | SimpleQuestionType
  | Calculator
  | Multipart
  | Tabular
  | Widget
  | NumberQuestion;

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
  rows: Array<any>;
  header: Array<any>;
}

export interface SelectConfig extends QuestionConfig<Select> {
  options: Array<Option>;
}

export interface WidgetConfig
  extends Omit<QuestionConfig<Widget>, "questionText"> {
  questionWidgetsBlock: Array<any>;
  instructions: string;
}

export interface MultipartConfig
  extends Omit<QuestionConfig<Multipart>, "questionText"> {
  parts: Array<any>;
}
