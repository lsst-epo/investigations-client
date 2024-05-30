/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { InteractiveCalculatorProps } from "@/types/calculators";
import MathInput from "@/components/form/Input/patterns/MathInput";
import Equation from "@/components/atomic/Equation";
import Calculator from "@/components/calculators/lib";
import * as Styled from "./styles";

const InteractiveCalculator: FunctionComponent<InteractiveCalculatorProps> = ({
  equation,
  id,
  value = {},
  onChangeCallback,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { inputs = [], result, latex } = Calculator(equation, value, language);

  const handleChange = (event: FormEvent<HTMLInputElement>, key: string) => {
    onChangeCallback &&
      onChangeCallback({
        ...value,
        [key]: (event.target as HTMLInputElement).value,
      });
  };
  return (
    <Styled.MathContainer>
      <Styled.Inputs id={id}>
        {inputs.map(({ key, precision, placeholder }) => {
          return (
            <Styled.InputRow key={key}>
              <label htmlFor={key}>
                <Equation latex={`${placeholder} =`} />
              </label>
              <MathInput
                value={value[key] ?? ""}
                onChange={(e) => handleChange(e, key)}
                id={key}
                step={10 ** -precision}
              />
            </Styled.InputRow>
          );
        })}
      </Styled.Inputs>
      <Equation latex={latex} />
      <Styled.LiveRegion htmlFor={id}>
        {t(`calculators.output.${equation}`, { result })}
      </Styled.LiveRegion>
    </Styled.MathContainer>
  );
};

InteractiveCalculator.displayName = "Calculator.Interactive";

export default InteractiveCalculator;
