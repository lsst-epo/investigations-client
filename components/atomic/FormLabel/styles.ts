import styled from "styled-components";

export const Label = styled.label`
  font-weight: bold;

  & > input {
    font-weight: revert;
  }
`;
