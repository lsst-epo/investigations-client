import styled from "styled-components";
import { Button } from "@rubin-epo/epo-react-lib";
import { Dialog as BaseDialog } from "@/layout/Modal/styles";

export {
  Backdrop,
  Header,
  Close,
  ComponentWrapper,
} from "@/layout/Modal/styles";

export const Dialog = styled(BaseDialog)<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
`;

export const ModalButton = styled(Button)`
  border-radius: 5px;

  &:not(:disabled):not([aria-disabled="true"]) {
    &:hover {
      outline: 1px solid var(--button-color, #fff);
      outline-offset: -3px;
    }

    &:focus-visible,
    &.focus-visible {
      outline: 1px solid #0067c2;
      outline-offset: unset;
    }

    &:active {
      --button-background-color: var(--turquoise90, #0c4a4c);

      outline: 0px;
    }
  }

  &:disabled,
  &[aria-disabled="true"] {
    --button-background-color: var(--neutral60, #6a6e6e);
    --button-border-color: var(--neutral60, #6a6e6e);
  }

  & > span {
    text-align: left;
  }
`;
