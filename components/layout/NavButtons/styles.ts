import styled from "styled-components";
import { respond } from "@/styles/globalStyles";

export const Nav = styled.nav`
  position: relative;
  top: -60px;
  float: right;
  display: block;

  > * {
    margin-left: 0.5em;
  }
  ${respond(`
    float: none;
    top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    grid-gap: 1em;
    > * {margin-left: 0;}`)}
`;

export const NavButton = styled.a`
  display: inline-block;
  min-width: 250px;
  padding: 1em 2em;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: var(--neutral10);
  ${(p) =>
    p.active
      ? `background-color: var(--turquoise60); color: var(--white);`
      : `&:hover {
    background-color: var(--turquoise20);
  }`}
  ${respond(`
    display: flex;
    flex-direction: column;
    place-content: center;
    min-width: auto;
    padding: 0.5em;
    font-size: 24px;
  `)}
`;
