import styled from "styled-components";
import WidgetContainer from "@/components/layout/WidgetContainer";
import { token } from "@rubin-epo/epo-react-lib/styles";

const breakSize = token("BREAK_LARGE_TABLET_MIN");

export const ColorToolContainer = styled(WidgetContainer)`
  --color-tool-padding: var(--PADDING_SMALL, 20px);

  &[data-modal-open="true"] {
    --color-tool-padding: var(--PADDING_MEDIUM, 40px);

    background-color: var(--white, #fff);
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
  }

  @container contentModal (min-width: ${breakSize}) {
    &[data-modal-open="true"] {
      max-width: 2000px;
      margin-inline: auto;
      position: static;
      height: auto;
    }
  }
`;
