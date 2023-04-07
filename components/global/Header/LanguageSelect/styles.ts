import styled from "styled-components";
import { Switch as FormSwitch } from "@rubin-epo/epo-react-lib";
import { respond, BREAK_HEADER_LAYOUT } from "@/styles/globalStyles";

export const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const Label = styled.label<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 700;

  ${({ $disabled }) => $disabled && `pointer-events: none;`}
`;

export const MobileLabelText = styled.span`
  display: none;
  padding-inline-end: min(5vw, 1.75em);

  ${respond(`display: block;`, BREAK_HEADER_LAYOUT)}
`;

export const Switch = styled(FormSwitch)`
  --Switch-Toggle-color: var(--turquoise90);
  --Switch-background-color: var(--turquoise50);
  --Switch-Inner-before-content: "En";
  --Switch-Inner-after-content: "Es";
`;
