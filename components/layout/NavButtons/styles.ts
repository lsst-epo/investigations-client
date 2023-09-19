import styled from "styled-components";
import { respond } from "@/styles/globalStyles";

export const Nav = styled.nav`
  display: block;
  float: right;
  position: relative;
  top: -60px;
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
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  padding: 1em 2em;
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
