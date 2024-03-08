import { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { InteractiveCalculatorProps } from "@/types/calculators";
import * as Styled from "./styles";

const SupernovaDistance: FunctionComponent<
  InteractiveCalculatorProps<{ peakApparent?: number; peakAbsolute?: number }>
> = ({ value = {}, onChangeCallback, className, calculatorFunction }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { peakApparent, peakAbsolute } = value;
  const { format } = new Intl.NumberFormat(language, {
    maximumFractionDigits: 0,
  });
  // const tex = "d = 10^{\\frac{m - M}{5} + 1}";

  const handleChange = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const numericValue = parseFloat(event.target.value) || undefined;

    return (
      onChangeCallback && onChangeCallback({ ...value, [key]: numericValue })
    );
  };

  const result = calculatorFunction(value);
  const distance = Number.isNaN(result)
    ? undefined
    : t("calculators.supernova_distance.result", { distance: format(result) });

  return (
    <math display="block" className={className}>
      <mrow>
        <mi>
          <Styled.MathOutput
            placeholder="d"
            defaultValue={distance}
            style={{
              width: `calc(${
                distance?.length || 2
              }ch + calc(var(--input-padding) * 2))`,
            }}
            readOnly
          />
        </mi>
        <mo>=</mo>
        <msup>
          <mn>10</mn>
          <mrow>
            <mfrac>
              <mrow>
                <mi>
                  <Styled.CondensedMathInput
                    type="number"
                    step="0.01"
                    placeholder="m"
                    defaultValue={peakApparent}
                    onChange={(e) => handleChange(e, "peakApparent")}
                    style={{
                      width: `calc(8ch + calc(var(--input-padding) * 2))`,
                    }}
                  />
                </mi>
                <mo>−</mo>
                <mi>
                  <Styled.CondensedMathInput
                    type="number"
                    step="0.001"
                    placeholder="M"
                    defaultValue={peakAbsolute}
                    onChange={(e) => handleChange(e, "peakAbsolute")}
                    style={{
                      width: `calc(8ch + calc(var(--input-padding) * 2))`,
                    }}
                  />
                </mi>
              </mrow>
              <mn>5</mn>
            </mfrac>
            <mo>+</mo>
            <mn>1</mn>
          </mrow>
        </msup>
      </mrow>
    </math>
  );
};

SupernovaDistance.displayName = "Calculator.Interactive.SupernovaDistance";

export default SupernovaDistance;
