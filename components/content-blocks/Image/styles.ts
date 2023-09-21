import styled, { css } from "styled-components";
import {
  Figure as BaseFigure,
  Image as BaseImage,
} from "@rubin-epo/epo-react-lib";
import BaseExpandContract from "@/atomic/ExpandContract/ExpandContract";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";
import { BREAK_PHABLET } from "@/styles/globalStyles";

interface LayoutProp {
  $layout: "vertical" | "horizontal";
}

export const Container = styled.section`
  --image-content-block-padding: ${fluidScale("20px", "10px")};
  position: relative;
`;

export const Figure = styled(BaseFigure)<LayoutProp & { $darkMode: boolean }>`
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
  padding: ${$darkMode ? 0 : "var(--image-content-block-padding)"};
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
