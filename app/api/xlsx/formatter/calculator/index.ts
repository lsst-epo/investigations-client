import { serverTranslation } from "@/lib/i18n";
import CalculatorFunctions from "@/components/calculators/math";
import { CalculatorFormatter } from "..";

const CalculatorFormatter: CalculatorFormatter = async ({
  cell,
  locale,
  equation,
  value,
}) => {
  const { t } = await serverTranslation(locale, "translation");

  const calculator = CalculatorFunctions[equation];

  if (!calculator) cell.value = t("review.no_answer");

  cell.value = calculator(value) || t("review.no_answer");
};

export default CalculatorFormatter;
