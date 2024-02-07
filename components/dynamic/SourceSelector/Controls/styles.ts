"use client";
import styled from "styled-components";
import { token } from "@rubin-epo/epo-react-lib/styles";
import { SelectionList as BaseSelectionList } from "@rubin-epo/epo-widget-lib/SourceSelector";
import { ElapsedTime as BaseElapsedTime } from "@rubin-epo/epo-widget-lib/Atomic";

export const ModalControls = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: calc(var(--PADDING_SMALL, 20px) / 2);
  position: absolute;
  bottom: calc(var(--PADDING_SMALL, 20px) / 2);
  left: calc(var(--PADDING_SMALL, 20px) / 2);
  width: calc(100% - var(--PADDING_SMALL, 20px));

  @container source-selector (min-width: ${token("BREAK_PHABLET_MIN")}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ElapsedTime = styled(BaseElapsedTime)`
  place-self: end;
`;

export const SelectionList = styled(BaseSelectionList)`
  align-self: end;
  color: var(--widget-text-color);
  font-size: 80%;

  button {
    color: var(--neutral95, #1f2121);
    pointer-events: auto;
  }
`;
