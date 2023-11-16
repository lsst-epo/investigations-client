import styled from "styled-components";
import BaseToast from "@rubin-epo/epo-react-lib/Toast";

export const Toaster = styled.div`
  --toast-transform: translateY(100%);

  margin: 0;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1;

  &[data-visible="true"] {
    --toast-transform: translateY(0);
  }

  @media (prefers-reduced-motion: no-preference) {
    --toast-transition: transform ease var(--toast-delay);
  }
`;

export const Toast = styled(BaseToast)`
  display: flex;
  background-color: #dce0e3;
  padding: 1.5em;
  width: 100%;
  position: relative;
  transform: var(--toast-transform);
  transition: var(--toast-transition, unset);
`;

export const ToastContent = styled.div`
  display: flex;
  gap: 1em;
  margin-inline: auto;
  max-width: 70ch;
  width: 100%;
`;

export const ToastIcon = styled.div`
  aspect-ratio: 1;
  background-color: var(--white, #fff);
  border: 1px solid var(--border-color);
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

export const ToastText = styled.div`
  > * + * {
    margin-top: 1em;
  }
`;
