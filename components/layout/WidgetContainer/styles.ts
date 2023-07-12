import styled from "styled-components";

export const WidgetContainer = styled.section`
  --widget-header-padding: calc(var(--PADDING_SMALL, 20px) / 4);

  container-type: inline-size;
  min-width: min-content;
`;

export const WidgetHeader = styled.header`
  background-color: var(--turquoise85, #12726c);
  color: var(--white, #fff);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--widget-header-padding);
  padding-inline-start: calc(var(--widget-header-padding) * 2);
`;

export const WidgetTitle = styled.h1`
  font-size: 1rem;
`;

export const WidgetContent = styled.div`
  background-color: var(--widget-background-color);
  padding: var(--widget-container-padding);
`;

export const WidgetCaption = styled.p`
  color: var(--widget-caption, inherit);
  font-size: 0.75rem;
  margin-block-start: var(--widget-header-padding);
`;
