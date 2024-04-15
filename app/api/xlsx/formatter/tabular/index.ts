import temml from "temml";
import { serverTranslation } from "@/lib/i18n";
import { Cell } from "@/components/layout/Table/helpers";

const renderStaticContent = ({ text, equation }: Partial<Cell>) => {
  if (equation) {
    const mathml = temml.renderToString(equation).replace(/<[^>]*>/g, "");

    return mathml;
  } else {
    return text;
  }
};

const TabularFormatter: TabularFormatter = async ({
  cell,
  locale,
  rows,
  value,
}) => {
  const { t } = await serverTranslation(locale, "translation");
  const { cells: header = [] } = rows.shift() || {};
  const headerLabels = header.map(renderStaticContent);

  const parsedRows = rows.reduce(
    (prev, { cells = [], previousQuestion = [] }) => {
      if (previousQuestion.length > 0) {
        return prev;
      }

      const row = cells.reduce((prev, { id, text, equation }, j) => {
        const cell = `${headerLabels[j]}: ${
          value[id] ||
          renderStaticContent({ text, equation }) ||
          t("review.no_answer")
        }`;

        return `${prev}${cell}\n`;
      }, "");

      return `${prev}${row}\n`;
    },
    ""
  );

  cell.value = parsedRows;
};

export default TabularFormatter;
