import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n";
import { getLabelByValue } from "@/components/questions/utils";
import { SelectFormatter } from ".";

const selectFormatter: SelectFormatter = async ({
  locale = fallbackLng,
  value = "",
  options,
  cell,
}) => {
  const { t } = await serverTranslation(locale, "translation");

  cell.value = getLabelByValue(options, value) || t("review.no_selection");
};

export default selectFormatter;
