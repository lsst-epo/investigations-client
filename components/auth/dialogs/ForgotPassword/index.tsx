"use client";

import { useId, useState } from "react";
import BasicModal from "@rubin-epo/epo-react-lib/BasicModal";
import Input from "@rubin-epo/epo-react-lib/Input";
import FormField from "@rubin-epo/epo-react-lib/FormField";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { useTranslation } from "react-i18next";
import forgotPassword from "@/lib/auth/actions/forgotPassword";
import AuthForm from "@/components/molecules/auth/AuthForm";
import * as Styled from "./styles";

export default function SignUp() {
  const id = useId();
  const { active, closeModal } = useAuthDialogManager();

  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const { t } = useTranslation();

  function getTitle() {
    switch (status) {
      case "success":
        return t("reset_password.success");
      case "error":
        return t("reset_password.error");
      default:
        return t("reset_password.header");
    }
  }

  function getDescription() {
    switch (status) {
      case "success":
        return t("reset_password.success_message");
      case "error":
        return t("reset_password.error_message");
      default:
        return t("reset_password.description");
    }
  }

  return (
    <BasicModal
      title={getTitle()}
      description={getDescription()}
      open={active === "forgotPassword"}
      onClose={closeModal}
    >
      {status !== "success" && (
        <AuthForm
          action={forgotPassword}
          onError={() => setStatus("error")}
          onSuccess={() => setStatus("success")}
          submitText={t("reset_password.submit")}
        >
          <FormField
            label={t("form.email_required")}
            htmlFor={`${id}-email`}
            required
          >
            <Input
              name="email"
              id={`${id}-email`}
              type="email"
              autoComplete="email username"
              required
            />
          </FormField>
        </AuthForm>
      )}
      {status === "success" && (
        <Styled.ConfirmButton
          onClick={() => {
            setStatus(null);
            closeModal();
          }}
        >
          {t("reset_password.confirm_button")}
        </Styled.ConfirmButton>
      )}
    </BasicModal>
  );
}
