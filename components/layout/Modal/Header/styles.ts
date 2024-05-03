import styled from "styled-components";
import ExpandContract from "@/atomic/ExpandContract/ExpandContract";

export const Close = styled(ExpandContract)`
  position: absolute !important;
  right: calc(var(--PADDING_SMALL) / 1.5);
  top: calc(var(--PADDING_SMALL) / 1.5);
  z-index: 1;
`;

export const Title = styled.span`
  color: var(--white, #fff);
  font-weight: var(--FONT_WEIGHT_BOLD, 600);
`;
