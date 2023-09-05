import styled from "styled-components";
import Container from "@rubin-epo/epo-react-lib/Container";
import { Buttonish } from "@rubin-epo/epo-react-lib";

export const LandingPageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .sign-in {
    margin-top: 30px;
  }
`;

export const Heading = styled.h1`
  margin-top: 30px;
`;

export const WithoutLoginLink = styled(Buttonish)`
  margin-top: 30px;
`;

export const LinkLabel = styled.div`
  margin-top: 14px;
  font-size: 12px;
`;
