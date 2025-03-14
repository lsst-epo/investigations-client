import styled from "styled-components";
import ExpandContract from "@/atomic/ExpandContract/ExpandContract";

export const Close = styled(ExpandContract)`
  /* stylelint-disable-next-line declaration-no-important */
  position: absolute !important;
  top: calc(var(--PADDING_SMALL) / 1.5);
  right: calc(var(--PADDING_SMALL) / 1.5);
  z-index: 1;
`;

export const Title = styled.span`
  font-weight: var(--FONT_WEIGHT_BOLD, 600);
  color: var(--white, #fff);
`;
