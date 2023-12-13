import { Cell } from "exceljs";
import { serverTranslation } from "@/lib/i18n";
import { WidgetFormatterFactory } from "..";
import { WidgetInput } from "@/types/answers";
import colorToolFormatter from "./colorTool";

export interface WidgetProps {
  locale: string;
  data: any;
  value: WidgetInput;
  id: string;
  cell: Cell;
}

const widgets: {
  [key: string]: (props: WidgetProps) => any;
} = {
  colorFilterToolBlock: colorToolFormatter,
};

const widgetFormatterFactory: WidgetFormatterFactory = async ({
  locale,
  value,
  id,
  cell,
  questionWidgetsBlock,
}) => {
  const { t } = await serverTranslation(locale, "translation");
  if (!value) {
    cell.value = t("review.no_answer");
    return;
  }

  const { typeHandle, ...widgetConfig } = questionWidgetsBlock[0];
  const formatter = widgets[typeHandle];

  await formatter({
    id,
    data: widgetConfig,
    value,
    locale,
    cell,
  });
};

export default widgetFormatterFactory;
