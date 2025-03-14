import styled from "styled-components";

export const Button = styled.button`
  --button-border-color: transparent;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  color: var(--black, #000);
  background-color: var(--white, #fff);

  &::before {
    position: absolute;
    width: 100%;
    height: 100%;
    outline: 1px solid var(--button-border-color);
    outline-offset: -1px;
    content: "";
  }

  &:hover,
  &:focus {
    --button-border-color: var(--neutral95, #1f2121);

    outline: 1px solid var(--button-border-color);
    outline-offset: -3px;
  }
`;
