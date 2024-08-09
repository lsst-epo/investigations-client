"use client";

import { useState } from "react";
import { BasicModal, Button } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { useTranslation } from "react-i18next";
import AuthButtons from "@/components/auth/buttons";
import CredentialSignIn from "@/components/organisms/auth/CredentialSignIn";
import * as Styled from "./styles";

export default function SignIn() {
  const { active, openModal, closeModal } = useAuthDialogManager();

  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const { t } = useTranslation();

  function getTitle() {
    switch (status) {
      case "success":
        return t("sign_in.success");
      default:
        return t("sign_in.header");
    }
  }

  function getDescription() {
    switch (status) {
      case "success":
        return t("sign_in.success_message");
      default:
        return undefined;
    }
  }

  return (
    <BasicModal
      title={getTitle()}
      description={getDescription()}
      open={active === "signIn"}
      onClose={closeModal}
    >
      {status !== "success" && (
        <Styled.Wrapper>
          <Styled.SSOSection>
            <span>{t("auth.log_in_w_oauth")}</span>
            <AuthButtons.GoogleSSO onError={() => setStatus("error")} />
          </Styled.SSOSection>
          <CredentialSignIn onSuccess={closeModal}>
            <Styled.ForgetCreateContainer>
              <Styled.LinkishButton
                type="button"
                onClick={() => openModal("forgotPassword")}
              >
                {t("sign_in.forgot_password_link")}
              </Styled.LinkishButton>
              <Styled.LinkishButton
                type="button"
                onClick={() => openModal("selectGroup")}
              >
                {t("sign_in.create_account_link")}
              </Styled.LinkishButton>
            </Styled.ForgetCreateContainer>
          </CredentialSignIn>
        </Styled.Wrapper>
      )}
      {status === "success" && (
        <Button
          onClick={() => {
            setStatus(null);
            closeModal();
          }}
        >
          {t("sign_in.confirm_button")}
        </Button>
      )}
    </BasicModal>
  );
}
