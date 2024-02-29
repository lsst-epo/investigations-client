import { Cell } from "exceljs";
import { Option } from "@/components/shapes/option";
import text from "./text";
import select from "./select";
import multiPart from "./inline";
import widget from "./widget";
import { InlineQuestionData, TextInput, WidgetInput } from "@/types/answers";
import {
  InlineReviewProps,
  ReviewPart,
} from "@/components/questions/Review/Inline";

interface FormatterBaseProps {
  locale: string;
  id: string;
  cell: Cell;
}

export interface TextProps extends FormatterBaseProps {
  value: TextInput;
}

export interface SelectProps extends TextProps {
  options: Array<Option>;
}

export interface WidgetProps {
  locale: string;
  data: any;
  value: WidgetInput;
  id: string;
  cell: Cell;
}

export interface InlineFactoryProps
  extends FormatterBaseProps,
    Omit<InlineReviewProps, "number"> {
  value: InlineQuestionData;
  parts: Array<ReviewPart>;
}

export interface WidgetFactoryProps extends FormatterBaseProps {
  value: WidgetInput;
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

type Formatter =
  | TextFormatter
  | SelectFormatter
  | InlineFormatterFactory
  | WidgetFormatterFactory;

const formatters: {
  [key: string]: Formatter;
} = {
  text,
  textarea: text,
  select,
  widget,
  multiPart,
};

export default formatters;
