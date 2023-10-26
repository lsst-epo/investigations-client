import styled from "styled-components";
import { Button } from "@rubin-epo/epo-react-lib";

export const Middle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: center;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const buttonShared = `
  width: calc(50% - 9px);
  max-width: 160px;
  font-size: 13px;
  border-width: 2px;
`;

const innerButton = `
  span {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    img {
      width: 60px;
      margin-bottom: 30px;
    }
  }
`;

export const StudentButton = styled(Button)`
  --button-background-color: var(--green05);
  --button-color: var(--black);

  ${buttonShared}
  margin-right: 18px;

  ${innerButton}

  span img {
    width: 60px;
    margin-top: 7px;
  }
`;

export const EducatorButton = styled(Button)`
  --button-background-color: var(--orange10);
  --button-border-color: #DB5400;
  --button-color: var(--black);

  ${buttonShared}
  ${innerButton}
`;

export const SignInButton = styled.button`
  width: 100%;
  color: var(--turquoise70);
`;
