import styled from "styled-components";
import BaseSignUp from "@/components/molecules/auth/SignUpButton";

export const Form = styled.form`
  max-width: 70ch;
  margin-inline: auto;

  > * + * {
    margin-block-start: var(--content-block-margin, var(--PADDING_SMALL, 20px));
  }
`;

export const Checkpoint = styled.h2`
  display: flex;
  gap: 1em;
  align-items: center;
  padding: 1em;
  font-size: 1rem;
  font-weight: normal;
  color: var(--neutral95, #1f2121);
  background-color: #b1f2ef;
  border-radius: 5px;
`;

export const CheckpointIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  aspect-ratio: 1;
  color: transparent;
  background-color: var(--white, #fff);
  border-radius: 50%;
`;

export const CheckpointDivider = styled.div`
  width: 1px;
  height: 3em;
  background-color: var(--neutral95, #1f2121);
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5em;
`;

export const SignUp = styled(BaseSignUp)`
  --button-color: var(--neutral95, #1f2121);
`;
