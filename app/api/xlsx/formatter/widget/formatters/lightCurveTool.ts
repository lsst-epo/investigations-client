import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n";
import { WidgetFormatter } from "../..";

const lightCurveFormatter: WidgetFormatter = async ({
  value,
  locale = fallbackLng,
  cell,
}) => {
  const { t } = await serverTranslation(locale, "translation");
  const { userMagnitude } = value;

  cell.value = userMagnitude
    ? t("widgets.light_curve.magnitude", { value: userMagnitude })
    : t("review.no_selection");
};

export default lightCurveFormatter;
