import { token } from "@rubin-epo/epo-react-lib/styles";
import styled from "styled-components";

export const WidgetContent = styled.div`
  background-color: var(--widget-background-color);
  color: var(--widget-text-color, initial);
  padding: var(--widget-container-padding);
  flex-grow: 1;
`;

export const WidgetContainer = styled.section`
  --widget-text-color: var(--neutral95, #1f2121);
  --widget-background-color: var(--white, #fff);
  --widget-header-padding: calc(var(--PADDING_SMALL, 20px) / 4);

  color: initial;
  container-type: inline-size;
  min-width: min-content;

  &[data-interactive="false"] {
    --widget-background-color: var(--neutral10, #f5f5f5);
  }

  &[data-modal-open="true"] {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    &[data-fill-screen="true"] {
      ${WidgetContent} {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        overflow-y: auto;

        @container (min-width: ${token("BREAK_LARGE_TABLET")}) {
          max-width: var(--widget-content-width, 2000px);
          margin-inline: auto;
          position: static;
          height: auto;
        }
      }
    }

    ${WidgetContent} {
      @container (min-width: ${token("BREAK_LARGE_TABLET")}) {
        max-width: var(--widget-content-width, 2000px);
        margin-inline: auto;
        position: static;
        height: auto;
      }
    }

    &[data-theme="dark"] {
      --widget-text-color: var(--white, #fff);
      --widget-background-color: transparent;
    }
    &[data-theme="light"] {
      --widget-text-color: var(--neutral95, #1f2121);
      --widget-background-color: var(--white, #fff);
    }
  }
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

export const WidgetCaption = styled.p`
  color: var(--widget-text-color, inherit);
  font-size: 0.75rem;
  margin-block-start: var(--widget-header-padding);
`;
