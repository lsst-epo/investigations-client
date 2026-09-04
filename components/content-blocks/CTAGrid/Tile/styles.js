/* eslint-disable */
import styled, { css } from "styled-components";
import BaseMixedLink from "@rubin-epo/epo-react-lib/MixedLink";
import BaseResponsiveImage from "@rubin-epo/epo-react-lib/ResponsiveImage";
import { BREAK_PHABLET, BREAK_TABLET } from "@/styles/globalStyles";

/*
Media queries are done this way for special treatment at tablet level vs phone level...
@media (max-width: ${BREAK_PHABLET}) {}
@media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {}
*/

export const ResponsiveImage = styled(BaseResponsiveImage)`
  height: 100%;
`;

export const ListItem = styled.li`
  position: relative;
`;

const tileStyles = css`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  align-content: start;
  height: 100%;
  padding: 0;
  text-decoration: none;

  /* HOVER STATES */
  transition: color 0.2s, background-color 0.2s;

  /* set the grid areas for various bits */
  .image {
    grid-area: image;
    overflow: hidden;
  }

  .pretitle {
    grid-area: pretitle;
  }

  .title {
    grid-area: title;
  }

  .subtitle {
    grid-area: subtitle;
  }

  .text {
    grid-area: text;
  }

  .footer {
    grid-area: footer;

    .c-buttonish {
      &:hover {
        outline: none;
      }
    }
  }

  &[href] {
    &:hover,
    &.focus-visible {
      outline: 3px solid var(--turquoise85);
      outline-offset: var(--Tile-hover-outline-offset, 1px);
    }
  }

  /* CTA (Also used for Image Grid) */
  &.cta {
    grid-template-areas:
      "image"
      "title";
    grid-row-gap: 0;
    justify-items: center;
    height: 100%;
    color: var(--white);
    background-color: var(--turquoise85);
    border-radius: 16px;

    .image {
      overflow: hidden;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      transition: opacity 0.2s;
    }

    .title {
      padding: 20px 5px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }

    .text {
      display: none;
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template: auto / 100px 2fr;
      grid-template-areas: "image title title";
      color: var(--turquoise85);
      background-color: var(--white);

      .image {
        height: 100px;
        border-radius: 16px;

        img {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }
      }

      .title {
        place-self: center left;
        text-align: left;
      }
    }
  }

  &.padded-bottom {
    padding-bottom: calc(15px + var(--size-spacing-m));

    @media (max-width: ${BREAK_TABLET}) {
      padding-bottom: 0;
    }
  }

  &:hover,
  &:focus-visible {
    &.cta[href] {
      .image {
        outline: none;
        opacity: 0.7;
      }
    }
  }
`;

export const MixedLink = styled(BaseMixedLink)`
  ${tileStyles}
`;

export const Tile = styled.div`
  ${tileStyles}
`;
