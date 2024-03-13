/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
import { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import isNumber from "lodash/isNumber";
import { InteractiveCalculatorProps } from "@/types/calculators";
import MathInput from "@/components/form/Input/patterns/MathInput";
import Output from "../Output";
import * as Styled from "./styles";
import Equation from "@/components/atomic/Equation";

const PeakAbsoluteMagnitude: FunctionComponent<
  InteractiveCalculatorProps<{ m15?: number }>
> = ({ value = {}, onChangeCallback, className, equation, id }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const A = 23.59;
  const B = 6.45;
  const { m15 } = value;

  const { format } = new Intl.NumberFormat(language);

  const m15Id = "dm15";
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

  const { result } = equation(value);

  return (
    <Styled.MathContainer>
      <Styled.Inputs>
        <Styled.InputRow>
          <label htmlFor={m15Id}>
            <Equation latex="\Delta m_{15}= " />
          </label>
          <MathInput
            value={m15}
            onChange={handleChange}
            // placeholder={m15Placeholder}
            step="0.01"
            id={m15Id}
          />
        </Styled.InputRow>
      </Styled.Inputs>
      <math display="block" {...{ className, id }}>
        <mrow>
          <mi>
            <Output
              value={result ? format(result) : undefined}
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
            <mi>{format(A)}</mi>
          </mrow>
          <mo>+</mo>
          <mi>{format(B)}</mi>
          <mo form="prefix" stretchy="false">
            (
          </mo>
          <mrow>
            <mi>{isNumber(m15) ? m15 : <Equation latex="\Delta m_{15}" />}</mi>
          </mrow>
          <mo form="postfix" stretchy="false">
            )
          </mo>
        </mrow>
      </math>
    </Styled.MathContainer>
  );
};

PeakAbsoluteMagnitude.displayName =
  "Calculator.Interactive.PeakAbsoluteMagnitude";

export default PeakAbsoluteMagnitude;
