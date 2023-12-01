"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import SignIn from "../buttons/SignIn";
import SignUp from "../buttons/SignUp";
import * as Styled from "./styles";

const SignedOut: FunctionComponent<{ firstPage: string }> = ({ firstPage }) => {
  const { t } = useTranslation();
  return (
    <>
      <SignIn />
      <Styled.WithoutLoginLink
        styleAs="tertiary"
        url={firstPage}
        text={t("auth.continue_wo_login_button")}
      />
      <Styled.LinkLabel>{t("auth.continue_wo_login_label")}</Styled.LinkLabel>
      <SignUp />
    </>
  );
};

SignedOut.displayName = "Auth.SignedOut";

export default SignedOut;
