import styled from "styled-components";
import { TextInput } from "../Text/styles";

export const ReadOnly = styled(TextInput)`
  &:read-only {
    --input-background-color: transparent;
    --input-border-color: var(--neutral60, #6a6e6e);

    min-width: unset;
    text-overflow: ellipsis;
    cursor: default;

    &:focus {
      outline: none;
    }

    @media only print {
      --input-border-color: transparent;
    }
  }
`;
