import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n";
import { WidgetFormatter } from "../..";

const sourceSelectorFormatter: WidgetFormatter = async ({
  value,
  locale = fallbackLng,
  cell,
}) => {
  const { t } = await serverTranslation(locale, "translation");
  const { selectedSource = [] } = value;

  const listFormatter = new Intl.ListFormat(locale, {
    style: "long",
    type: "conjunction",
  });

  cell.value = listFormatter.format(selectedSource) || t("review.no_selection");
};

export default sourceSelectorFormatter;
