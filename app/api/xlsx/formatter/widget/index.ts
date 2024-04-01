import { serverTranslation } from "@/lib/i18n";
import { WidgetFormatter, WidgetFormatterFactory } from "..";
import * as formatters from "./formatters";

const widgets: Record<string, WidgetFormatter> = {
  questionWidgetsBlock_colorFilterToolBlock_BlockType: formatters.colorTool,
  questionWidgetsBlock_sourceSelectorBlock_BlockType: formatters.sourceSelector,
  questionWidgetsBlock_lightCurveBlock_BlockType: formatters.lightCurveTool,
};

const widgetFormatterFactory: WidgetFormatterFactory = async ({
  locale,
  value,
  id,
  cell,
  questionWidgetsBlock,
}) => {
  const { t } = await serverTranslation(locale, "translation");
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
  });
};

export default widgetFormatterFactory;
