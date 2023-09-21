import { ptToEm, fluidScale } from "@rubin-epo/epo-react-lib/styles";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: block;
`;

export const TextContent = styled.div<{ $darkMode: boolean }>`
  ${({ $darkMode }) =>
    $darkMode
      ? css`
          color: var(--white, #fff);
        `
      : ""}

  > * + * {
    margin-block-start: 1rem;
  }

  > *:first-child {
    margin-block-start: 0;
  }

  a:not([class^="c-"]) {
    color: var(--turquoise50, #00bebf);
    text-decoration: none;
  }

  p {
    font-size: ${fluidScale("22px", "16px")};
  }

  ul {
    padding-left: 1em;
    list-style-type: disc;
  }

  ol {
    padding-left: 1em;
    list-style-type: decimal;
  }

  li {
    padding-left: 0.5em;
  }

  h1 {
    margin-block-start: ${ptToEm("144pt")};
  }

  h2 {
    margin-block-start: ${ptToEm("40pt")};
  }

  h3,
  h4 {
    margin-block-start: ${ptToEm("20pt")};
  }

  figcaption {
    font-size: 18px;
    padding-block-start: 1em;
    padding-block-end: 1em;
  }
`;
