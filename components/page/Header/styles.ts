import styled from "styled-components";
import { Button } from "@rubin-epo/epo-react-lib";

export const Header = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  transform: none;
  transition: transform 0.4s;
  background-color: var(--turquoise85, #12726d);
  z-index: 1;

  &.invisible {
    transform: translate3d(0, -100%, 0);
  }
`;

export const FullWidthCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
`;

export const BottomRow = styled.div`
  display: flex;
  width: 100%;
`;

export const MainMenuToggle = styled(Button)`
  svg {
    height: 20px;
  }
`

export const TocToggle = styled(Button)`
  svg {
    height: 20px;
  }
`
