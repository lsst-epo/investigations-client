import { Option } from "@/components/shapes/option";

export const getLabelByValue = (options: Array<Option>, value?: string) => {
  const label = options.find((o) => o.value === value)?.label;

  return label || value;
};
