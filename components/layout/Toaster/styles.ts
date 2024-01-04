import styled from "styled-components";
import { Toaster as BaseToaster } from "react-hot-toast";

export const Toaster = styled(BaseToaster)`
  @keyframes slideIn {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
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
  margin-inline: auto;
  max-width: 70ch;
  width: 100%;

  & > [role="status"] {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0;
    padding: 0;
  }
`;

export const ToastIcon = styled.div`
  aspect-ratio: 1;
  background-color: var(--white, #fff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  stroke-width: 0;
`;

export const CloseToast = styled.button`
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  color: var(--turquoise85, #12726d);
  position: absolute;
  top: 0.5em;
  right: 0.5em;
`;
