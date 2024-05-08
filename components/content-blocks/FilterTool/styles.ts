"use client";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import styled from "styled-components";

export const WidgetContainer = styled(WidgetContainerWithModal)`
  --widget-padding: 0px;
`;

export const WidgetInstructions = styled.div`
  color: var(--text-color);
  margin-block-end: var(--interaction-group-margin);
`;
