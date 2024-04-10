import { fallbackLng } from "@/lib/i18n/settings";

type ValidatorOperator =
  | "greaterThan"
  | "greaterThanOrEqual"
  | "lessThan"
  | "lessThanOrEqual"
  | "equals"
  | "notEqual";

interface Validator {
  comparison: string;
  operator: string;
  message: string;
}

const operators: Record<string, string> = {
  greaterThan: ">",
  greaterThanOrEqual: "\\geq",
  lessThan: "<",
  lessThanOrEqual: "\\leq",
  equals: "=",
  notEqual: "\\neq",
};

const useValidation = (
  id?: string,
  locale = fallbackLng
): undefined | ((value?: string | null) => void) => {
  if (!id) return;

  const runValidation = async (value?: string | null) => {
    if (!value) return;

    const result = await fetch(
      `/api/validation?locale=${locale}&value=${value}&id=${id}`
    );
  };

  return runValidation;

  // for (const { comparison, operator, message } of validators) {
  //   const expression = `${value} ${operator}`;
  // }
};

export default useValidation;
