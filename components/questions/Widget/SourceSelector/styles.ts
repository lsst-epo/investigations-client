"use client";
import styled from "styled-components";
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
