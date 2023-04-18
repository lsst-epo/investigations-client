import styled, { css } from "styled-components";
import { token } from "@rubin-epo/epo-react-lib";

const colorCycle = [
  "#8C65A5",
  "var(--turquoise55, #009fa1)",
  "#021A18",
  "var(--turquoise85,#12726c)",
  "#E17A05",
  "#ED4C4C",
];

export const TabbedSelectorContainer = styled.div`
  --tab-panel-border-color: var(--turquoise55, #009fa1);
  container-type: inline-size;
`;
export const TabList = styled.div`
  --tab-gap: 0;

  display: flex;
  justify-content: space-between;
  gap: var(--tab-gap);
  position: relative;
  top: 1px;

  @container (min-width: ${token("BREAK_MOBILE_MIN")}) {
    --tab-gap: 0.25em;
  }

  @container (min-width: ${token("BREAK_TABLET_MIN")}) {
    --tab-gap: 0.5em;
  }
`;
export const Tab = styled.button`
  --tab-border-color: var(--neutral60, #6a6e6e);
  --tab-border-bottom-color: var(--tab-panel-border-color);

  box-sizing: border-box;
  background-color: var(--white, #fff);
  border: 1px solid var(--tab-border-color);
  border-bottom-color: var(--tab-border-bottom-color);
  color: var(--tab-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  height: 30px;
  position: relative;

  &:hover&:not([aria-selected="true"]) {
    outline: 2px solid var(--black, #000);
    outline-offset: -2px;
  }

  &[aria-selected="true"] {
    --tab-border-color: var(--tab-panel-border-color);
    --tab-border-bottom-color: var(--white, #fff);

    &::before {
      background-color: var(--tab-color);
      height: 4px;
      width: calc(100% + 2px);
      position: absolute;
      top: -1px;
      left: -1px;
      content: "";
    }
  }

  ${colorCycle.reduce((prev, curr, i) => {
    const value = prev.concat(
      css`
        &:nth-of-type(${colorCycle.length}n + ${i + 1}) {
          --tab-color: ${curr};
        }
      `
    );

    return value;
  }, css``)}
`;
export const TabPanel = styled.div`
  --tab-panel-padding: calc(var(--PADDING_SMALL, 20px) / 4);

  @container (min-width: ${token("BREAK_MOBILE_MIN")}) {
    --tab-panel-padding: calc(var(--PADDING_SMALL, 20px) / 2);
  }

  @container (min-width: ${token("BREAK_TABLET_MIN")}) {
    --tab-panel-padding: var(--PADDING_SMALL, 20px);
  }

  background-color: var(--white, #fff);
  border: 1px solid var(--tab-panel-border-color);
  padding-block: var(--tab-panel-padding);
`;

export const ButtonRow = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  gap: var(--tab-panel-padding);
  padding: var(--tab-panel-padding) var(--tab-panel-padding) 0;
`;

export const TabButton = styled.button`
  background-color: var(--turquoise85, #12726c);
  color: var(--white, #fff);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 75%;
  font-weight: var(--FONT_WEIGHT_BOLD, 600);
  line-height: 1;
  padding: calc(var(--tab-panel-padding) / 2) var(--tab-panel-padding);

  &:disabled {
    background-color: var(--neutral60, #6a6e6e);
    cursor: default;
  }
`;
