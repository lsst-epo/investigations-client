import { token } from "@rubin-epo/epo-react-lib/styles";
import styled from "styled-components";

export const WidgetBlock = styled.div`
  --target-height: 1;
  --widget-header-height: 36px;
  --widget-padding: calc(var(--PADDING_SMALL, 20px) / 2);
  --widget-header-padding: calc(var(--PADDING_SMALL, 20px) / 4);

  --global-ui-height: calc(
    var(--pager-height, 0px) + var(--header-height, 0px)
  );
  --widget-ui-height: calc(
    var(--widget-header-height, 0px) + var(--widget-padding, 0px)
  );
  --screen-height: calc(
    100vh - var(--global-ui-height) - var(--widget-ui-height)
  );
  --widget-max-height: calc(var(--screen-height) * var(--target-height));

  &[data-modal-open="true"] {
    --global-ui-height: 0px;
    --widget-ui-height: var(--widget-padding, 0px);
    --widget-background-color: var(--white, #fff);
  }

  background-color: var(--widget-background-color);
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  @container (min-width: ${token("BREAK_LARGE_TABLET")}) {
    --widget-padding: var(--PADDING_SMALL, 20px);
    --target-height: 0.85;

    background-color: transparent;
    justify-content: center;
  }
`;

export const WidgetContainer = styled.div`
  background-color: var(--widget-background-color, var(--neutral10, #f5f5f5));
  color: var(--widget-text-color, initial);
  max-width: 100%;
`;

export const WidgetHeader = styled.header`
  background-color: var(--turquoise85, #12726c);
  color: var(--white, #fff);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--widget-header-height);
  gap: var(--widget-header-padding);
  padding: var(--widget-header-padding);
  padding-inline-start: calc(var(--widget-header-padding) * 2);
`;

export const WidgetTitle = styled.h3`
  font-size: 1em;
`;

export const WidgetBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--widget-padding);
  gap: var(--widget-padding);
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
  color: var(--widget-text-color, inherit);
  font-size: 0.75em;
`;
