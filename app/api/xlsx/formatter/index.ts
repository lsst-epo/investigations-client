import { Cell } from "exceljs";
import { Cell as TableCell } from "@/components/questions/TabularQuestion/Table";
import { Option } from "@/components/shapes/option";
import text from "./text";
import select from "./select";
import multiPart from "./inline";
import widget from "./widget";
import tabular from "./tabular";
import { InlineQuestionData, TextInput, WidgetInput } from "@/types/answers";
import {
  InlineReviewProps,
  ReviewPart,
} from "@/components/questions/Review/Inline";

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
}

export interface InlineFactoryProps
  extends FormatterBaseProps<InlineQuestionData>,
    Omit<InlineReviewProps, "number"> {
  parts: Array<ReviewPart>;
}

export interface WidgetFactoryProps extends FormatterBaseProps<WidgetInput> {
  questionWidgetsBlock: any[];
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

type Formatter =
  | TextFormatter
  | SelectFormatter
  | InlineFormatterFactory
  | WidgetFormatterFactory
  | TabularFormatter;

const formatters: Record<string, Formatter> = {
  text,
  textarea: text,
  select,
  widget,
  multiPart,
  tabular,
};

export default formatters;
