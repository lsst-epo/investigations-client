"use client";

import { useState } from "react";
import { BasicModal, Button, Input } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { signIn } from "./actions";
import { useTranslation } from "react-i18next";
import { usePathToRevalidate } from "../../clientHelpers";
import * as Styled from "./styles";

export default function SignIn() {
  const { active, openModal, closeModal } = useAuthDialogManager();

  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const { t } = useTranslation();

  const pathToRevalidate = usePathToRevalidate();

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
          <Styled.WidthConstrainer>
            <Styled.SSOSection>
              <Styled.SSOSectionInstructions>
                {t("auth.log_in_w_oauth")}
              </Styled.SSOSectionInstructions>
              <Styled.GoogleSSOButton onError={() => setStatus("error")} />
              {/* <Styled.FacebookSSOButton onError={() => setStatus("error")} /> */}
            </Styled.SSOSection>
            <Styled.EmailSection>
              <Styled.EmailSectionInstructions>
                {t("auth.log_in_w_email")}
              </Styled.EmailSectionInstructions>
              <form
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                action={async (formData: FormData) => {
                  try {
                    const data = await signIn(formData, pathToRevalidate);

                    if (data?.authenticate) {
                      closeModal();
                    }

                    setStatus(null);
                  } catch (error) {
                    setStatus("error");
                  }
                }}
              >
                <div>
                  <Styled.Label htmlFor="signInEmail">
                    {t("form.email")}
                  </Styled.Label>
                  <Input
                    name="email"
                    id="signInEmail"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
                <Styled.Password>
                  <Styled.Label htmlFor="signInPassword">
                    {t("form.password")}
                  </Styled.Label>
                  <Input
                    name="password"
                    id="signInPassword"
                    type="password"
                    required
                    autoComplete="current-password"
                  />
                </Styled.Password>
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
                <Styled.SignInButton>
                  {(pending) =>
                    t(pending ? "sign_in.submit_pending" : "sign_in.submit")
                  }
                </Styled.SignInButton>
                <output>
                  {status === "error" && <p>{t("sign_in.error_message")}</p>}
                </output>
              </form>
            </Styled.EmailSection>
          </Styled.WidthConstrainer>
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
