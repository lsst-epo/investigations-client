import styled from "styled-components";
import { Toaster as BaseToaster } from "react-hot-toast";

export const Toaster = styled(BaseToaster)`
  /* stylelint-disable-next-line keyframes-name-pattern */
  @keyframes slideIn {
    from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0);
    }
  }

  /* stylelint-disable-next-line keyframes-name-pattern */
  @keyframes slideOut {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(100%);
    }
  }
`;

export const ToastContainer = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  max-width: 70ch;
  margin-inline: auto;

  & > [role="status"] {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0;
    margin: 0;
  }
`;

export const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  aspect-ratio: 1;
  background-color: var(--white, #fff);
  border-radius: 50%;
  stroke-width: 0;
`;

export const CloseToast = styled.button`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  padding: 0;
  margin: 0;
  color: var(--turquoise85, #12726d);
  background: none;
  border: 0;
`;
