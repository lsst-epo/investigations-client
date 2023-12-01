"use client";

import { useState } from "react";
import { BasicModal, Input } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { registerEducator, registerStudent } from "./actions";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

export default function SignUp() {
  const { active, pendingGroup, openModal, closeModal } =
    useAuthDialogManager();

  const [status, setStatus] = useState<"error" | null>(null);

  const { t } = useTranslation();

  function getTitle() {
    switch (status) {
      case "error":
        return t("register.error");
      default:
        return t("register.header", { context: pendingGroup });
    }
  }

  return (
    <BasicModal
      title={getTitle()}
      open={active === "signUp"}
      onClose={closeModal}
    >
      <form
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        action={async (formData: FormData) => {
          try {
            if (pendingGroup === "educators") {
              const data = await registerEducator(formData);
              if (data?.registerEducators) {
                openModal("statusPending");
              }
            } else {
              const data = await registerStudent(formData);
              if (data?.registerStudents) {
                openModal("statusPending");
              }
            }
          } catch (error) {
            setStatus("error");
          }

          setStatus(null);
        }}
      >
        <Styled.InputWrapper>
          <Styled.Label htmlFor="signUpEmail">
            {t("form.email_required")}
          </Styled.Label>
          <Input
            name="email"
            id="signUpEmail"
            type="email"
            autoComplete="email"
            required
          />
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <Styled.Label htmlFor="registerFirstName">
            {t("form.first_name_optional")}
          </Styled.Label>
          <Input
            name="firstName"
            id="registerFirstName"
            type="text"
            autoComplete="given-name"
          />
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <Styled.Label htmlFor="registerLastName">
            {t("form.last_name_optional")}
          </Styled.Label>
          <Input
            name="lastName"
            id="registerLastName"
            type="text"
            autoComplete="family-name"
          />
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <Styled.Label htmlFor="signUpPassword">
            {t("form.password_required")}
            <Styled.Instructions>
              {t("form.create_password_instructions")}
            </Styled.Instructions>
          </Styled.Label>
          <Input
            name="password"
            id="signUpPassword"
            type="password"
            autoComplete="current-password"
            required
          />
        </Styled.InputWrapper>
        <Styled.ButtonsWrapper>
          <Styled.SubmitButton>
            {(pending) =>
              t(pending ? "register.submit_pending" : "register.submit")
            }
          </Styled.SubmitButton>
          <Styled.CancelButton
            type="button"
            styleAs="secondary"
            onClick={() => {
              setStatus(null);
              closeModal();
            }}
          >
            {t("form.cancel")}
          </Styled.CancelButton>
        </Styled.ButtonsWrapper>
        <output>
          {status === "error" && <p>{t("register.error_message")}</p>}
        </output>
      </form>
    </BasicModal>
  );
}
