import styled from "styled-components";
import Submit from "@/components/form/Submit";
import AuthButtons from "@/components/auth/buttons";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 13px;
`;

export const WidthConstrainer = styled.div`
  max-width: 400px;
  width: 100%;
`;

export const SSOSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SSOSectionInstructions = styled.p`
  margin-bottom: 20px;
`;

export const GoogleSSOButton = styled(AuthButtons.GoogleSSO)`
  margin-top: 15px;
`;

export const FacebookSSOButton = styled(AuthButtons.FacebookSSO)`
  margin-top: 15px;
`;

export const EmailSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 36px;
`;

export const EmailSectionInstructions = styled.p`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-weight: 700;
`;

export const Password = styled.div`
  margin-top: 11px;
`;

export const ForgetCreateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const LinkishButton = styled.button`
  color: var(--turquoise70, #058b8c);
  font-size: 16px;
  font-weight: 700;
`;

export const SignInButton = styled(Submit)`
  width: 100%;
  margin-top: 15px;
`;
