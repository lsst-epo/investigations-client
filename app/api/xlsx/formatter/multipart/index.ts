import { serverTranslation } from "@/lib/i18n";
import { fallbackLng } from "@/lib/i18n/settings";
import { InlineFormatterFactory } from "..";
import { getLabelByValue } from "@/components/questions/utils";
import { MultiselectInput } from "@/types/answers";

const inlineFormatter: InlineFormatterFactory = async ({
  locale = fallbackLng,
  value,
  parts,
  cell,
}) => {
  const { t } = await serverTranslation(locale, "translation");

  const noSelection = t("review.no_selection");
  const noEntry = t("review.no_answer");

  if (!value || Object.keys(value).length === 0) {
    cell.value = noEntry;
    return;
  }

  const richText = parts.map(({ type, id, text, options = [] }) => {
    switch (type) {
      case "readonlyText":
        return { font: { bold: false }, text };
      case "select":
        return {
          font: { bold: true },
          text: ` ${
            getLabelByValue(options, value[id] as string) || noSelection
          } `,
        };
      case "multiselect":
        return {
          font: { bold: true },
          text: ` ${
            (value[id] as MultiselectInput)
              .map((select) => getLabelByValue(options, select))
              .join(", ") || noSelection
          } `,
        };
      default:
        return {
          font: { bold: true },
          text: ` ${(value[id] as string) || noEntry} `,
        };
    }
  });

  cell.value = { richText };
};

export default inlineFormatter;
