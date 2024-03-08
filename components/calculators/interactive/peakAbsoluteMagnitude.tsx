import { ChangeEvent, FunctionComponent } from "react";
import { InteractiveCalculatorProps } from "@/types/calculators";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";

const PeakAbsoluteMagnitude: FunctionComponent<
  InteractiveCalculatorProps<{ m15?: number }>
> = ({ value = {}, onChangeCallback, className, calculatorFunction }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const A = 23.598;
  const B = 6.457;
  const { m15 } = value;
  const { format } = new Intl.NumberFormat(language, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  const result = calculatorFunction(value);
  const mPeak = Number.isNaN(result) ? undefined : format(result);

  const m15Placeholder = t("calculators.peak_absolute_magnitude.placeholder", {
    delta: "\u{394}",
    interpolation: { escapeValue: false },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseFloat(event.target.value) || undefined;

    console.log({ numericValue });

    onChangeCallback && onChangeCallback({ m15: numericValue });
  };

  return (
    <math display="block" className={className}>
      <mrow>
        <mi>
          <Styled.MathOutput
            type="text"
            defaultValue={mPeak}
            placeholder="M"
            readOnly
            style={{
              width: `calc(${
                mPeak?.length || 2
              }ch + calc(var(--input-padding) * 2))`,
            }}
          />
        </mi>
        <mo>=</mo>
        <mrow>
          <mo>−</mo>
          <mi>{format(A)}</mi>
        </mrow>
        <mo>+</mo>
        <mi>{format(B)}</mi>
        <mo form="prefix" stretchy="false">
          (
        </mo>
        <mrow>
          <mn>
            <Styled.MathInput
              defaultValue={m15}
              onChange={handleChange}
              placeholder={m15Placeholder}
              type="number"
              step="0.01"
              style={{
                width: `calc(8ch + calc(var(--input-padding) * 2))`,
              }}
            />
          </mn>
        </mrow>
        <mo form="postfix" stretchy="false">
          )
        </mo>
      </mrow>
    </math>
  );
};

PeakAbsoluteMagnitude.displayName =
  "Calculator.Interactive.PeakAbsoluteMagnitude";

export default PeakAbsoluteMagnitude;
