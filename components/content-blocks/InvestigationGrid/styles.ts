"use client";
import styled from "styled-components";
import { MixedLink as BaseMixedLink } from "@rubin-epo/epo-react-lib";
import {
  BREAK_DESKTOP,
  BREAK_TABLET,
  BREAK_MOBILE,
  BREAK_PHABLET,
  fluidScale,
} from "@/styles/globalStyles";
import { EarlyAccess } from "@/components/atomic";
import { FlagBody, OffsetWrapper } from "@/atomic/Flag/styles";

export const Container = styled.section`
  display: block;
`;

export const MixedLink = styled(BaseMixedLink)`
  --Tile-image-margin-top: ${fluidScale("77px", "22px")};
  --Tile-bg-color: var(--turquoise85);
  --Tile-color: var(--white);
  --Tile-image-bg-color: var(--neutral20);
  --Tile-border-color: var(--neutral20);

  position: relative;
  display: grid;
  grid-template-areas:
    "image"
    "title";
  grid-template-rows: ${fluidScale("234px", "164px")} 1fr;
  /* stylelint-disable declaration-block-no-redundant-longhand-properties */
  grid-template-columns: 1fr;
  /* stylelint-enable declaration-block-no-redundant-longhand-properties */
  align-content: start;
  justify-items: center;
  padding: 0;
  color: var(--Tile-color);
  text-decoration: none;
  border-radius: 16px;

  &[aria-disabled="true"] {
    --Tile-bg-color: #6a6e6e;
    --Tile-image-filter: grayscale(100%);

    pointer-events: none;
    cursor: default;

    @media (max-width: ${BREAK_PHABLET}) {
      --Tile-bg-color: transparent;
      --Tile-color: #6a6e6e;
    }
  }

  &:hover:not([aria-disabled="true"]),
  &:focus-visible:not([aria-disabled="true"]) {
    --Tile-image-bg-color: var(--turquoise10);
    --Tile-bg-color: var(--turquoise85);
    --Tile-border-color: var(--turquoise85);

    @media (max-width: ${BREAK_PHABLET}) {
      --Tile-bg-color: transparent;
    }
  }

  @media (max-width: ${BREAK_PHABLET}) {
    --Tile-bg-color: var(--white);
    --Tile-color: var(--turquoise85);

    grid-template: auto / 100px 2fr;
    grid-template-areas: "image title title";
  }
`;

export const ImageWrapper = styled.div`
  grid-area: image;
  width: 100%;
  padding-block-end: ${fluidScale("40px", "5px")};
  margin-block-start: var(--Tile-image-margin-top);
  background-color: var(--Tile-image-bg-color);
  border-top: 3px solid var(--Tile-border-color);
  border-right: 3px solid var(--Tile-border-color);
  border-left: 3px solid var(--Tile-border-color);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: background-color 0.2s, border-color 0.2s;

  img {
    width: ${fluidScale("200px", "150px")};
    height: ${fluidScale("200px", "150px")};
    margin: calc(var(--Tile-image-margin-top) * -1) auto 0 auto;
    filter: var(--Tile-image-filter, none);
  }

  @media (max-width: ${BREAK_PHABLET}) {
    height: 100px;
    padding: 10px;
    margin: 0 auto;
    border-bottom: 3px solid var(--Tile-border-color);
    border-radius: 16px;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;

    img {
      width: 80px;
      height: 80px;
      margin: auto;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: title;
  justify-content: center;
  width: 100%;
  padding: 20px 10px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  background-color: var(--Tile-bg-color);
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  transition: backgroud-color 0.2s;

  @media (max-width: ${BREAK_PHABLET}) {
    align-self: center;
    justify-self: left;
    text-align: left;
  }
`;

export const EarlyAccessFlag = styled(EarlyAccess)`
  position: absolute;
  top: var(--Tile-image-margin-top);
  right: 16px;
  left: auto;

  @media (max-width: ${BREAK_DESKTOP}) {
    right: 0;
    border-top-right-radius: 16px;
  }

  @media (max-width: ${BREAK_PHABLET}) {
    top: 0;
    right: auto;
    left: 100px;
  }

  ${OffsetWrapper} {
    @media (max-width: ${BREAK_PHABLET}) {
      transform: translateX(-100%);
    }
  }

  ${FlagBody} {
    padding: ${fluidScale("8px", "4px", BREAK_TABLET, BREAK_MOBILE)};

    @media (max-width: ${BREAK_DESKTOP}) {
      border-top-right-radius: 16px;
    }
  }
`;
