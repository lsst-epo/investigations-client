import styled from "styled-components";
import Submit from "@/components/form/Submit";

export const Wrapper = styled.div`
  padding-top: 13px;
`;

export const SSOSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SSOSectionInstructions = styled.p`
  margin-bottom: 20px;
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
