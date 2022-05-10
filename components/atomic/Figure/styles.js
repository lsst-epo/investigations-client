import styled, { css } from "styled-components";
import { ptToEm } from "@/styles/globalStyles";

export const Figure = styled.figcaption`
  ${({ $withBackground }) =>
    $withBackground &&
    css`
      background-color: var(--neutral10);
      padding: 20px;
    `}
`;

export const FigCaption = styled.figcaption`
  font-size: ${ptToEm("14pt")};
  line-height: 1.428;
  padding-top: 13px;
`;
