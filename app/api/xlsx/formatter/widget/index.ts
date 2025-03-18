import { serverTranslation } from "@/lib/i18n/server";
import { WidgetInput } from "@/types/answers";
import { FormatterBaseProps, WidgetFormatterFactory } from "..";
import * as formatters from "./formatters";

export interface WidgetProps extends FormatterBaseProps<WidgetInput> {
  data: any;
}

export type WidgetFormatter = (props: WidgetProps) => Promise<void>;

const widgets: Record<string, WidgetFormatter> = {
  questionWidgetsBlock_colorFilterToolBlock_BlockType: formatters.colorTool,
  questionWidgetsBlock_sourceSelectorBlock_BlockType: formatters.sourceSelector,
  questionWidgetsBlock_lightCurveBlock_BlockType: formatters.lightCurveTool,
  questionWidgetsBlock_isochronePlot_BlockType: formatters.isochronePlot,
};

const widgetFormatterFactory: WidgetFormatterFactory = async ({
  locale,
  value,
  id,
  cell,
  questionWidgetsBlock,
}) => {
  const { t } = await serverTranslation(locale, [
    "translation",
    "epo-react-lib",
    "epo-widget-lib",
  ]);
  const { __typename, ...widgetConfig } = questionWidgetsBlock[0];
  const formatter = widgets[__typename];

  if (!formatter || !value) {
    cell.value = t("review.no_answer");
    return;
  }

  await formatter({
    id,
    data: widgetConfig,
    value,
    locale,
    cell,
    t,
  });
};

export default widgetFormatterFactory;
