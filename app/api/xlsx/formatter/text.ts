import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n";
import { TextFormatter } from ".";

const textFormatter: TextFormatter = async ({
  locale = fallbackLng,
  value = "",
  cell,
}) => {
  const { t } = await serverTranslation(locale, "translation");

  cell.value = value || t("review.no_answer");
};

export default textFormatter;
