import styled from "styled-components";
import Container from "@rubin-epo/epo-react-lib/Container";
import { Buttonish, Image as BaseImage } from "@rubin-epo/epo-react-lib";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";
import {
  BREAK_MOBILE,
  BREAK_DESKTOP,
} from "@/styles/globalStyles";

export const LandingPageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: calc(100dvh - 80px);

  .sign-in {
    width: 100%;
    max-width: 320px;
  }
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WithoutLoginLink = styled(Buttonish)`
  width: 100%;
  max-width: 320px;
  justify-content: center;
  align-items: center;

  .sign-in {
    margin-top: 30px;
  }
`;

export const LinkLabel = styled.div`
  width: 100%;
  max-width: 320px;
  margin-top: 14px;
  font-size: 12px;
`;

export const Image = styled(BaseImage)`
  max-width: ${fluidScale("300px", "150px", BREAK_DESKTOP, BREAK_MOBILE)};
`;
