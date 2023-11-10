import styled from "styled-components";
import WidgetContainer from "@/components/layout/WidgetContainer";

export const ColorToolContainer = styled(WidgetContainer)`
  --color-tool-padding: var(--PADDING_SMALL, 20px);

  &[data-modal-open="true"] {
    background-color: var(--white, #fff);
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    overflow-y: auto;
  }

  @container contentModal (min-width: 940px) {
    &[data-modal-open="true"] {
      --color-tool-padding: var(--PADDING_MEDIUM, 40px);
      max-width: 2000px;
      margin-inline: auto;
      position: static;
      height: auto;
    }
  }
`;
