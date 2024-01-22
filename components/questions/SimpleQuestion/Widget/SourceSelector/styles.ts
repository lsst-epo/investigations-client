"use client";
import styled from "styled-components";
import { SelectionList as BaseSelectionList } from "@rubin-epo/epo-widget-lib/SourceSelector";

export const SelectionList = styled(BaseSelectionList)`
  margin-block-start: calc(var(--PADDING_SMALL, 20px) / 2);
`;
