import { token } from "@rubin-epo/epo-react-lib/styles";
import styled from "styled-components";

export const WidgetBlock = styled.div`
  --target-height: 1;
  --widget-header-height: 36px;
  --widget-padding: var(--content-gap);
  --widget-header-padding: calc(var(--PADDING_SMALL, 20px) / 4);
  --instructions-height: 2em;
  --widget-ui-height: calc(
    var(--widget-header-height, 0px) + var(--widget-padding, 0px)
  );
  --screen-height: calc(
    100vh - var(--global-ui-height) - var(--widget-ui-height)
  );
  --widget-max-height: calc(var(--screen-height) * var(--target-height));

  &[data-modal-open="true"] {
    --global-ui-height: 0px;
    --widget-ui-height: calc(
      calc(var(--widget-padding, 0px) * 3) + var(--instructions-height)
    );
    --widget-background-color: var(--white, #fff);
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  @container (min-width: ${token("BREAK_LARGE_TABLET")}) {
    --target-height: 0.85;

    background-color: transparent;
  }
`;

export const WidgetContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  color: var(--widget-text-color, initial);
`;

export const WidgetHeader = styled.header`
  display: flex;
  gap: var(--widget-header-padding);
  align-items: center;
  justify-content: space-between;
  height: var(--widget-header-height);
  padding: var(--widget-header-padding);
  padding-inline-start: calc(var(--widget-header-padding) * 2);
  color: var(--white, #fff);
  background-color: var(--turquoise85, #12726c);
`;

export const WidgetTitle = styled.h3`
  font-size: 1em;
`;

export const WidgetBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--widget-padding);
  padding: var(--widget-padding);
  background-color: var(--widget-background-color, var(--neutral10, #f5f5f5));
`;

export const WidgetRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--widget-padding);

  @container (min-width: ${token("BREAK_LARGE_TABLET")}) {
    flex-direction: row;
  }
`;

export const WidgetCaption = styled.div`
  font-size: 0.75em;
  color: var(--widget-text-color, inherit);
`;
