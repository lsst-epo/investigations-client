"use client";
import styled from "styled-components";

export const InstructionsContainer = styled.div`
  display: flex;
  justify-content: center;
  height: var(--instructions-height, 2em);
  color: var(--widget-text-color);
`;

export const InfoButton = styled.button`
  --icon-outline-width: 2px;
  --icon-outline-offset: 1px;

  position: relative;
  display: flex;
  gap: 1ch;
  align-items: center;
  justify-content: center;
  padding: calc(var(--icon-outline-width) + var(--icon-outline-offset));
  overflow: hidden;
  color: inherit;

  svg {
    border-radius: 50%;
  }

  &:not(:disabled):hover,
  &:not(:disabled):focus,
  &:not(:disabled):focus-visible {
    outline: none;

    svg {
      outline: var(--icon-outline-width) solid var(--widget-text-color, inherit);
      outline-offset: var(--icon-outline-offset);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    span {
      position: relative;
      right: 50%;
      white-space: nowrap;
      opacity: 0;
      transition-delay: 0s;
      transition-duration: calc(var(--DURATION, 0.2s) / 2);
      transition-property: right, opacity;
    }

    svg {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      transition-duration: var(--DURATION, 0.2s);
      transition-property: left, transform;
      will-change: left, transform;
    }

    &:not(:disabled):hover,
    &:not(:disabled):focus,
    &:not(:disabled):focus-visible {
      span {
        right: 0;
        opacity: 1;
        transition-delay: 0s, calc(var(--DURATION, 0.2s) / 2);
        transition-duration: var(--DURATION, 0.2s);
      }

      svg {
        left: 0;
        transform: translateX(0);
      }
    }
  }
`;

export const ToastBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 100%;
  padding: 1.5em;
  color: var(--neutral95, #1f2121);
  background-color: #e6ffe6;

  @media (prefers-reduced-motion: no-preference) {
    --animation-time: var(--DURATION, 0.2s);
  }

  /* stylelint-disable-next-line keyframes-name-pattern */
  @keyframes slideIn {
    from {
      transform: translateY(calc(100% + 2px));
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
      transform: translateY(calc(100% + 2px));
    }
  }
`;
