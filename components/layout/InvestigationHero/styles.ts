import { FunctionComponent } from "react";
import styled from "styled-components";
import { fluidScale, respond, tokens } from "@rubin-epo/epo-react-lib/styles";
import { aHidden } from "@/styles/mixins/appearance";
import { EarlyAccess } from "@/components/atomic";
import { FlagBody, OffsetWrapper } from "@/components/atomic/Flag/styles";

const BUTTON_WRAPPER_PADDING = fluidScale(
  "60px",
  "15px",
  tokens.BREAK_TABLET,
  tokens.BREAK_MOBILE
);

const DURATION_WIDTH = "197px";

export const Inner = styled.div`
  position: relative;
  display: grid;
  grid-template:
    "image text duration"
    "image button duration"
    / 200px 1fr ${DURATION_WIDTH};
  column-gap: 60px;
  align-items: stretch;
  max-width: 1158px;
  margin: 0 auto;

  ${respond(
    `
      grid-template:
        "text"
        "image"
        "button"
        / 1fr;
      row-gap: ${fluidScale("30px", "15px")};
      justify-items: center;
      padding-block-start: 62px;
      padding-block-end: 30px;
    `,
    tokens.BREAK_TABLET
  )}
`;

export const Image = styled.div`
  grid-area: image;
  align-self: center;
  width: ${fluidScale("200px", "160px")};
  height: ${fluidScale("200px", "160px")};
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: text;
  align-items: flex-start;
  justify-content: center;

  ${respond(
    `
    margin-right: 60px;
    margin-left: 60px;
    `,
    tokens.BREAK_TABLET
  )}

  ${respond(
    `
    margin-right: 15px;
    margin-left: 15px;
    `,
    tokens.BREAK_MOBILE
  )}
`;

export const ButtonWrapper = styled.div`
  grid-area: button;

  ${respond(
    `
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-inline-start: ${BUTTON_WRAPPER_PADDING};
      padding-inline-end: ${BUTTON_WRAPPER_PADDING};
    `,
    tokens.BREAK_TABLET
  )}
`;

export const EarlyAccessFlag = styled(
  EarlyAccess as FunctionComponent<{ className?: string }>
)`
  position: absolute;
  top: 0;
  right: ${DURATION_WIDTH};

  @media (max-width: ${tokens.BREAK_TABLET}) {
    right: auto;
    left: 0;
  }

  ${OffsetWrapper} {
    transform: translateX(50%);

    @media (max-width: ${tokens.BREAK_TABLET}) {
      transform: unset;
    }
  }

  ${FlagBody} {
    padding-right: ${fluidScale(
      "14px",
      "8px",
      tokens.BREAK_TABLET,
      tokens.BREAK_MOBILE
    )};
    padding-left: ${fluidScale(
      "14px",
      "8px",
      tokens.BREAK_TABLET,
      tokens.BREAK_MOBILE
    )};
  }
`;

export const Duration = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: duration;
  align-items: center;
  justify-content: center;
  min-height: 265px;
  padding-inline: 5px;
  text-align: center;
  background-color: #ffe7cc;

  ${respond(
    `
      position: absolute;
      top: 0;
      right: 0;
      flex-direction: row;
      min-height: 0;
      padding: 10px;

      svg {
        width: 15px;
        height: 17px;
        margin-inline-end: 9px;
      }
    `,
    tokens.BREAK_TABLET
  )}
`;

export const DurationTime = styled.div`
  font-size: ${fluidScale("40px", "24px")};
  font-weight: bold;

  ${respond(
    `
      font-size: 16px;
    `,
    tokens.BREAK_TABLET
  )}
`;

export const DurationText = styled.div`
  padding-block-start: 10px;

  @media (max-width: ${tokens.BREAK_TABLET}) {
    ${aHidden}
  }
`;
