import styled from "styled-components";
import { Button } from "@rubin-epo/epo-react-lib";
import AuthButtons from "@/components/auth/buttons";

export const InnerModal = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 50px;
`;

export const GoogleSSOButton = styled(AuthButtons.GoogleSSO)`
  margin-top: 10px;
`;

export const FacebookSSOButton = styled(AuthButtons.FacebookSSO)`
  margin-top: 10px;

`;

export const EmailButton = styled(Button)`
  margin-top: 10px;

`;

export const SignInButton = styled.button`
  width: 100%;
  margin-top: 18px;
  color: var(--turquoise70);
`;
