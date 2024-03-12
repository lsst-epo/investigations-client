/* eslint-disable react/no-unknown-property */
import { FormEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { InteractiveCalculatorProps } from "@/types/calculators";
import Output from "../Output";
import MathInput from "@/components/form/Input/patterns/MathInput";

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

  return (
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
                <mi>
                  <MathInput
                    step="0.1"
                    placeholder="m"
                    value={peakApparent}
                    onChange={(e) => handleChange(e, "peakApparent")}
                    condensed
                  />
                </mi>
                <mo>−</mo>
                <mi>
                  <MathInput
                    step="0.01"
                    placeholder="M"
                    value={peakAbsolute}
                    onChange={(e) => handleChange(e, "peakAbsolute")}
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
