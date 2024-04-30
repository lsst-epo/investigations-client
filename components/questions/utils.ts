import { Option } from "@/components/shapes/option";

export const getLabelByValue = (options: Array<Option>, value?: string) => {
  const label = options.find((o) => o.value === value)?.label;

  return label || value;
};

export const stepFromPrecision = (precision: number | string | null) => {
  const defaultPrecision = "0";
  const stringifiedPrecision = precision ? String(precision) : defaultPrecision;

  return 10 ** -parseFloat(stringifiedPrecision);
};
