import styled from "styled-components";
import BaseInput from "@rubin-epo/epo-react-lib/Input";

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--PADDING_SMALL, 20px);
  margin-block-start: var(--PADDING_SMALL, 20px);
`;

export const Label = styled.label`
  font-weight: var(--FONT_WEIGHT_BOLD, 600);
`;

export const Input = styled(BaseInput)`
  font-weight: var(--FONT_WEIGHT_NORMAL, 400);
`;

export const Instructions = styled.div`
  font-weight: var(--FONT_WEIGHT_NORMAL, 400);
`;
