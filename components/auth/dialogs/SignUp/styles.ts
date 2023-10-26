import styled from "styled-components";
import { Button } from "@rubin-epo/epo-react-lib";
import Submit from "@/components/form/Submit";

export const InputWrapper = styled.div`
  margin-top: 20px;
`;

export const Label = styled.label`
  font-weight: 700;
  line-height: 1.5;
`;

export const Instructions = styled.div`
  color: #313333;
  font-weight: 400;
  line-height: 1.5;
  font-size: 14px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const buttonWidth = `
  width: calc(50% - 10px);
`;

export const SubmitButton = styled(Submit)`
  ${buttonWidth}
`;

export const CancelButton = styled(Button)`
  ${buttonWidth}
`;
