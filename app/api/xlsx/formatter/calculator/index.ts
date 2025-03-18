import { serverTranslation } from "@/lib/i18n/server";
import Calculator from "@/components/calculators/lib";
import { CalculatorFormatter } from "..";

const Formatter: CalculatorFormatter = async ({
  cell,
  locale,
  equation,
  value,
}) => {
  const { t } = await serverTranslation(locale, "translation");

  cell.value =
    Calculator(equation, value, locale).result || t("review.no_answer");
};

export default Formatter;
