"use client";
import styled from "styled-components";

export const InstructionsContainer = styled.div`
  color: var(--widget-text-color);
  grid-area: instructions;
  display: flex;
  justify-content: center;
  margin-block: 1em;
`;

export const InfoButton = styled.button`
  --icon-outline-width: 2px;
  --icon-outline-offset: 1px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1ch;
  color: inherit;
  padding: calc(var(--icon-outline-width) + var(--icon-outline-offset));
  position: relative;
  overflow: hidden;

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
      transition-property: right, opacity;
      transition-duration: calc(var(--DURATION, 0.2s) / 2);
      transition-delay: 0s;
    }

    svg {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      transition-property: left, transform;
      transition-duration: var(--DURATION, 0.2s);
      will-change: left, transform;
    }

    &:not(:disabled):hover,
    &:not(:disabled):focus,
    &:not(:disabled):focus-visible {
      span {
        right: 0;
        opacity: 1;
        transition-duration: var(--DURATION, 0.2s);
        transition-delay: 0s, calc(var(--DURATION, 0.2s) / 2);
      }
      svg {
        left: 0;
        transform: translateX(0);
      }
    }
  }
`;

export const ToastBar = styled.div`
  bottom: 0;
  background-color: #e6ffe6;
  color: var(--neutral95, #1f2121);
  padding: 1.5em;
  position: fixed;
  width: 100%;
  max-width: 100%;

  @media (prefers-reduced-motion: no-preference) {
    --animation-time: var(--DURATION, 0.2s);
  }

  @keyframes slideIn {
    from {
      transform: translateY(calc(100% + 2px));
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
      transform: translateY(calc(100% + 2px));
    }
  }
`;

export const Instructions = styled.div``;
