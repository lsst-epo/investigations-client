import styled, { css } from "styled-components";
import {
  Figure as BaseFigure,
  Image as BaseImage,
} from "@rubin-epo/epo-react-lib";
import BaseExpandContract from "@/atomic/ExpandContract/ExpandContract";
import { BREAK_PHABLET } from "@/styles/globalStyles";

interface LayoutProp {
  $layout: "vertical" | "horizontal";
}

export const Container = styled.section`
  align-self: center;
  max-width: var(--max-image-width);
  width: 100%;
  position: relative;
`;

export const Figure = styled(BaseFigure)<
  LayoutProp & { $darkMode: boolean; $layout: string }
>`
  ${({ $layout, $darkMode }) => css`
    ${$darkMode &&
    css`
      > figcaption {
        color: var(--white, #fff);
        padding-block: var(--image-content-block-padding);
        padding-inline: var(--image-content-block-padding);
      }
    `}
    ${$layout === "horizontal" &&
    css`
      > figcaption {
        margin: 0;
        padding: 0;
      }
    `}
  padding: var(--image-content-block-padding, 0);
  `}

  &:after {
    content: "";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
`;

export const Image = styled(BaseImage)<LayoutProp>`
  ${({ $layout }) => css`
    ${$layout === "horizontal" &&
    css`
      @media (min-width: ${BREAK_PHABLET}) {
        @supports (float: inline-start) {
          float: inline-start;
        }

        float: left;
        margin-inline-end: var(--image-content-block-padding);
        max-inline-size: 50%;
      }
    `}
  `};
`;

export const ExpandContract = styled(BaseExpandContract)<LayoutProp>`
  --expand-contract-offset: calc(var(--image-content-block-padding) * 1.25);
  position: absolute;
  top: var(--expand-contract-offset);
  right: var(--expand-contract-offset);

  ${({ $layout }) =>
    $layout === "horizontal" &&
    css`
      @media (min-width: ${BREAK_PHABLET}) {
        right: auto;
        left: var(--expand-contract-offset);
      }
    `}
`;
