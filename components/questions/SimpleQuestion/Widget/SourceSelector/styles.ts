"use client";
import styled from "styled-components";
import { SelectionList as BaseSelectionList } from "@rubin-epo/epo-widget-lib/SourceSelector";
import { token } from "@rubin-epo/epo-react-lib/styles";
import LightCurvePlotContainer from "@/components/dynamic/LightCurvePlot";

export const MultiWidgetContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: var(--widget-container-padding);

  @container (min-width: ${token("BREAK_LARGE_TABLET_MIN")}) {
    grid-auto-columns: 50%;
    grid-auto-flow: column;
  }
`;

export const SelectionList = styled(BaseSelectionList)`
  margin-block-start: calc(var(--PADDING_SMALL, 20px) / 2);
`;

export const LightCurvePlot = styled(LightCurvePlotContainer)`
  aspect-ratio: 1;
`;
