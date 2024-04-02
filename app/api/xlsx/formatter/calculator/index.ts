import { serverTranslation } from "@/lib/i18n";
import Calculator from "@/components/calculators/lib";
import { CalculatorFormatter } from "..";

const CalculatorFormatter: CalculatorFormatter = async ({
  cell,
  locale,
  equation,
  value,
}) => {
  const { t } = await serverTranslation(locale, "translation");

  cell.value =
    Calculator(equation, value, locale).result || t("review.no_answer");
};

export default CalculatorFormatter;
