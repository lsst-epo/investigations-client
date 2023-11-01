import styled from "styled-components";
import ExpandContract from "@/atomic/ExpandContract/ExpandContract";

export const Header = styled.div`
  background-color: var(--header-background-color, transparent);
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: header;
  padding: 1ch;
  width: 100%;
`;

export const Close = styled(ExpandContract)`
  margin-left: auto;
`;

export const Title = styled.span`
  color: var(--white, #fff);
  font-weight: var(--FONT_WEIGHT_BOLD, 600);
`;
