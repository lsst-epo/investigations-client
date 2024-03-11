/* eslint-disable react/no-unknown-property */
import { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { InteractiveCalculatorProps } from "@/types/calculators";
import MathInput from "@/components/form/Input/patterns/MathInput";
import Output from "../Output";

const PeakAbsoluteMagnitude: FunctionComponent<
  InteractiveCalculatorProps<{ m15?: number }>
> = ({ value = {}, onChangeCallback, className, equation, id }) => {
  const { t } = useTranslation();
  const A = 23.59;
  const B = 6.45;
  const { m15 } = value;

  const m15Placeholder = t("calculators.peak_absolute_magnitude.placeholder", {
    delta: "\u{394}",
    interpolation: { escapeValue: false },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeCallback &&
      onChangeCallback({
        m15: parseFloat(event.target.value),
      });
  };

  return (
    <math display="block" {...{ className, id }}>
      <mrow>
        <mi>
          <Output
            value={equation(value).result}
            forId={id}
            placeholder={
              <var>
                M<sub>peak</sub>
              </var>
            }
          />
        </mi>
        <mo>=</mo>
        <mrow>
          <mo>−</mo>
          <mi>{A}</mi>
        </mrow>
        <mo>+</mo>
        <mi>{B}</mi>
        <mo form="prefix" stretchy="false">
          (
        </mo>
        <mrow>
          <mn>
            <MathInput
              value={m15}
              onChange={handleChange}
              placeholder={m15Placeholder}
              step="0.01"
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
