import styled from "styled-components";
import WidgetContainer from "@/components/layout/WidgetContainer";
import { token } from "@rubin-epo/epo-react-lib/styles";

const breakSize = token("BREAK_LARGE_TABLET_MIN");

export const ColorToolContainer = styled(WidgetContainer)`
  --color-tool-padding: var(--PADDING_SMALL, 20px);

  &[data-modal-open="true"] {
    --color-tool-padding: var(--PADDING_MEDIUM, 40px);
    --frame-max-height: calc(100dvh - var(--color-tool-padding) * 2);
    --frame-ratio-w: 1;
    --frame-ratio-h: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-inline: auto;
    width: 100%;
    max-width: 2000px;
    height: 100%;

    > div {
      /* Padding is width/height, since % padding is based off the element's width */
      --ratio: calc(var(--frame-ratio-h, 1) / var(--frame-ratio-w, 1) * 100%);
      /**
      * The height of the frame is either the calculated padding value, or a maximum
      * passed in (using --frame-max-height). This effectively clamps the height.
      */
      --frame-height: min(var(--ratio), var(--frame-max-height));
      position: relative;
      padding-bottom: var(--frame-height);
      /**
      * The width should be 100% where possible, but should maintain aspect ratio
      * first and foremost. In order to do so we can take the calculated height
      * and reverse engineer the width.
      */
      width: min(
        calc(
          var(--frame-height, 0) * (var(--frame-ratio-w) / var(--frame-ratio-h))
        ),
        100%
      );
      height: 0;
    }
  }
`;
