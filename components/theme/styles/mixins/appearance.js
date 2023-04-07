import { css } from "styled-components";

export const focusDefault = (style = "") => {
  return `
    .js-focus-visible &:focus:not(.focus-visible) {
      outline-width: 0;
    }

    &.focus-visible:not(:disabled) {
      outline: auto 4px;
      ${style}
    }
  `;
};

export const protoButton = () => {
  return `
    display: inline-block;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 0;
    appearance: none;
  `;
};

export const aFocus = (styles = "") => css`
  ${focusDefault(css`
    outline: 3px solid var(--black);
    outline-offset: 1px;
    border-color: var(--black);
    ${styles}
  `)}
`;

export const aButtonTheme = (style) => {
  switch (style) {
    case "secondary":
      return css`
        --button-background-color: var(--red);
        --button-border-color: var(--red);
        --button-color: var(--white);
      `;

    case "tertiary":
      return css`
        --button-background-color: var(--white);
        --button-border-color: var(--black);
        --button-color: var(--black);
      `;

    case "educator":
      return css`
        --button-background-color: var(--orange55);
        --button-border-color: var(--orange55);
        --button-focus-outline-color: var(--black);
        --button-color: var(--black);
      `;

    default:
      return css`
        --button-background-color: var(--turquoise85);
        --button-border-color: var(--turquoise85);
        --button-color: var(--white);
      `;
  }
};

export const aButton = css`
  ${protoButton()}

  border: 1px solid var(--button-border-color);
  border-radius: 6px;
  background-color: var(--button-background-color);
  padding: 15px 32px;
  color: var(--button-color) !important;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;

  ${aFocus()}

  &:hover {
    outline: 3px solid var(--button-border-color);
    outline-offset: 1px;
  }

  &:disabled,
  &[aria-disabled] {
    background-color: var(--neutral40);
    border-color: var(--neutral40);
    pointer-events: none;

    &.focus-visible,
    &:hover {
      outline: 0;
    }
  }
`;
