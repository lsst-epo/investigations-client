import { serverTranslation } from "@/lib/i18n";
import { WidgetFormatter, WidgetFormatterFactory } from "..";
import * as formatters from "./formatters";

const widgets: {
  [key: string]: WidgetFormatter;
} = {
  colorFilterToolBlock: formatters.colorTool,
  sourceSelectorBlock: formatters.sourceSelector,
};

const widgetFormatterFactory: WidgetFormatterFactory = async ({
  locale,
  value,
  id,
  cell,
  questionWidgetsBlock,
}) => {
  const { t } = await serverTranslation(locale, "translation");
  const { typeHandle, ...widgetConfig } = questionWidgetsBlock[0];
  const formatter = widgets[typeHandle];

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
