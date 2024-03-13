/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
import { FormEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import isNumber from "lodash/isNumber";
import { InteractiveCalculatorProps } from "@/types/calculators";
import Output from "../Output";
import MathInput from "@/components/form/Input/patterns/MathInput";
import * as Styled from "./styles";
import Equation from "@/components/atomic/Equation";

const SupernovaDistance: FunctionComponent<
  InteractiveCalculatorProps<{ peakApparent?: number; peakAbsolute?: number }>
> = ({ value = {}, onChangeCallback, className, equation, id }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { peakApparent, peakAbsolute } = value;
  const { format } = new Intl.NumberFormat(language);

  const handleChange = (event: FormEvent<HTMLInputElement>, key: string) => {
    return (
      onChangeCallback &&
      onChangeCallback({
        peakApparent,
        peakAbsolute,
        [key]: parseFloat(event.target.value),
      })
    );
  };

  const { result } = equation(value);

  const distance = result
    ? t("calculators.supernova_distance.result", {
        distance: format(result),
      })
    : undefined;

  const peakApparentId = "peakApparent";
  const peakAbsoluteId = "peakAbsolute";

  return (
    <Styled.MathContainer>
      <Styled.Inputs>
        <Styled.InputRow>
          <label htmlFor={peakApparentId}>
            <Equation latex="m =" />
          </label>
          <MathInput
            step="0.1"
            value={peakApparent}
            onChange={(e) => handleChange(e, "peakApparent")}
            condensed
            id={peakApparentId}
          />
        </Styled.InputRow>
        <Styled.InputRow>
          <label htmlFor={peakAbsoluteId}>
            <Equation latex="M =" />
          </label>
          <MathInput
            step="0.01"
            value={peakAbsolute}
            onChange={(e) => handleChange(e, "peakAbsolute")}
            id={peakAbsoluteId}
          />
        </Styled.InputRow>
      </Styled.Inputs>

      <math display="block" {...{ id, className }}>
        <mrow>
          <mi>
            <Output forId={id} value={distance} placeholder="d" />
          </mi>
          <mo>=</mo>
          <mrow>
            <mo fence="true" form="prefix">
              (
            </mo>
            <mn>{format(3.26)}</mn>
            <mo fence="true" form="postfix">
              )
            </mo>
          </mrow>
          <msup>
            <mn>10</mn>
            <mrow>
              <mfrac>
                <mrow>
                  <mi>{isNumber(peakApparent) ? format(peakApparent) : "m"}</mi>
                  <mo>−</mo>
                  <mi>{isNumber(peakAbsolute) ? format(peakAbsolute) : "M"}</mi>
                </mrow>
                <mn>5</mn>
              </mfrac>
              <mo>+</mo>
              <mn>1</mn>
            </mrow>
          </msup>
        </mrow>
      </math>
    </Styled.MathContainer>
  );
};

SupernovaDistance.displayName = "Calculator.Interactive.SupernovaDistance";

export default SupernovaDistance;
