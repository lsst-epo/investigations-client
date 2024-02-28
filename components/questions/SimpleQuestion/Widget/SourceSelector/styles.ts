"use client";
import styled from "styled-components";
import { SelectionList as BaseSelectionList } from "@rubin-epo/epo-widget-lib/SourceSelector";
import { token } from "@rubin-epo/epo-react-lib/styles";

export const MultiWidgetContainer = styled.div`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-rows: 1fr;
  gap: var(--widget-container-padding);

  @container (min-width: ${token("BREAK_LARGE_TABLET_MIN")}) {
    grid-auto-flow: column;
  }
`;

export const SelectionList = styled(BaseSelectionList)`
  margin-block-start: calc(var(--PADDING_SMALL, 20px) / 2);
`;
