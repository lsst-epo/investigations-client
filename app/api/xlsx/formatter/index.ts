import { Cell } from "exceljs";
import { Cell as TableCell } from "@/components/layout/Table/helpers";
import { Option } from "@/components/shapes/option";
import text from "./text";
import select from "./select";
import multiPart from "./inline";
import widget from "./widget";
import tabular from "./tabular";
import calculator from "./calculator";
import { InlineQuestionData, TextInput, WidgetInput } from "@/types/answers";
import {
  InlineReviewProps,
  ReviewPart,
} from "@/components/questions/Review/Inline";
import { Equation } from "@/types/calculators";
import { AnswerType } from "@/types/questions";

interface FormatterBaseProps<T = any> {
  locale: string;
  id: string;
  cell: Cell;
  value: T;
}

export type TextProps = FormatterBaseProps<TextInput>;

export interface SelectProps extends TextProps {
  options: Array<Option>;
}

export interface WidgetProps extends FormatterBaseProps<WidgetInput> {
  data: any;
}

export interface TabularProps extends FormatterBaseProps<WidgetInput> {
  rows: Array<{ cells: Array<TableCell>; previousQuestion: Array<any> }>;
  header: Array<any>;
}

export interface InlineFactoryProps
  extends FormatterBaseProps<InlineQuestionData>,
    Omit<InlineReviewProps, "number"> {
  parts: Array<ReviewPart>;
}

export interface WidgetFactoryProps extends FormatterBaseProps<WidgetInput> {
  questionWidgetsBlock: any[];
}

export interface CalculatorProps extends FormatterBaseProps<WidgetInput> {
  equation: Equation;
}

export type TextFormatter = (props: TextProps) => Promise<void>;
export type SelectFormatter = (props: SelectProps) => Promise<void>;
export type WidgetFormatter = (props: WidgetProps) => Promise<void>;
export type InlineFormatterFactory = (
  props: InlineFactoryProps
) => Promise<void>;
export type WidgetFormatterFactory = (
  props: WidgetFactoryProps
) => Promise<void>;
export type TabularFormatter = (props: TabularProps) => Promise<void>;
export type CalculatorFormatter = (props: CalculatorProps) => Promise<void>;

type Formatter =
  | TextFormatter
  | SelectFormatter
  | InlineFormatterFactory
  | WidgetFormatterFactory
  | TabularFormatter
  | CalculatorFormatter;

const formatters: Record<AnswerType, Formatter> = {
  text,
  textarea: text,
  select,
  widget,
  multiPart,
  tabular,
  calculator,
  number: text,
};

export default formatters;
