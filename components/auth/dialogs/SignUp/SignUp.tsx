"use client";

import { useState } from "react";
import BasicModal from "@rubin-epo/epo-react-lib/BasicModal";
import FormButtons from "@rubin-epo/epo-react-lib/FormButtons";
import Button from "@rubin-epo/epo-react-lib/Button";
import Submit from "@/components/atomic/Submit";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { registerEducator, registerStudent } from "./actions";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

export default function SignUp() {
  const { active, pendingGroup, openModal, closeModal } =
    useAuthDialogManager();

  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  function getTitle() {
    if (error !== null) return t("register.error");

    return t("register.header", { context: pendingGroup });
  }

  return (
    <BasicModal
      title={getTitle()}
      open={active === "signUp"}
      onClose={closeModal}
    >
      <Styled.SignUpForm
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

            setError(null);
          } catch (error) {
            setError((error as Error).message);
          }
        }}
      >
        <Styled.Label>
          {t("form.email_required")}
          <Styled.Input
            name="email"
            id="signUpEmail"
            type="email"
            autoComplete="email"
            required
          />
        </Styled.Label>
        <Styled.Label>
          {t("form.first_name_optional")}
          <Styled.Input
            name="firstName"
            id="registerFirstName"
            type="text"
            autoComplete="given-name"
          />
        </Styled.Label>
        <Styled.Label>
          {t("form.last_name_optional")}
          <Styled.Input
            name="lastName"
            id="registerLastName"
            type="text"
            autoComplete="family-name"
          />
        </Styled.Label>
        <Styled.Label>
          {t("form.password_required")}
          <Styled.Instructions>
            {t("form.create_password_instructions")}
          </Styled.Instructions>
          <Styled.Input
            name="password"
            id="signUpPassword"
            type="password"
            autoComplete="current-password"
            minLength={6}
            required
          />
        </Styled.Label>
        <FormButtons>
          <Submit>
            {(pending) =>
              t(pending ? "register.submit_pending" : "register.submit")
            }
          </Submit>
          <Button
            id="signUpButton"
            type="button"
            styleAs="secondary"
            onClick={() => {
              setError(null);
              closeModal();
            }}
          >
            {t("form.cancel")}
          </Button>
        </FormButtons>
        <output>{error}</output>
      </Styled.SignUpForm>
    </BasicModal>
  );
}
