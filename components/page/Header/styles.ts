import styled from "styled-components";
import { token } from "@rubin-epo/epo-react-lib/styles";

export const Header = styled.div`
  --header-height: 40px;
  display: flex;
  background-color: var(--turquoise85, #12726d);
  height: var(--header-height);

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    --header-height: 72px;
  }
`;
