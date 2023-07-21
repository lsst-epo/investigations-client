import styled from "styled-components";
import { TextInput as BaseTextInput } from "../../SimpleQuestion/Text/styles";

export const InputContainer = styled.div`
  display: flex;
  gap: 1em;
`;

export const TextInput = styled(BaseTextInput)`
  --text-bg: var(--white, #fff);

  margin: 0;
  min-width: 9em;
`;
