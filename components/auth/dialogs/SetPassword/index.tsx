"use client";

import { useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import BasicModal from "@rubin-epo/epo-react-lib/BasicModal";
import FormField from "@rubin-epo/epo-react-lib/FormField";
import Password from "@rubin-epo/epo-react-lib/Password";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { useTranslation } from "react-i18next";
import setPassword from "@/lib/auth/actions/setPassword";
import AuthForm from "@/components/molecules/auth/AuthForm";

export default function SignUp() {
  const formId = useId();
  const { active, closeModal, openModal } = useAuthDialogManager();

  const [status, setStatus] = useState<
    "success" | "error" | "missingParams" | null
  >(null);

  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const id = searchParams.get("id");

  function getTitle() {
    switch (status) {
      case "success":
        return t("set_password.success");
      case "error":
        return t("set_password.error");
      default:
        return t("set_password.header");
    }
  }

  function getDescription() {
    switch (status) {
      case "success":
        return t("set_password.success_message");
      case "error":
        return t("set_password.error_message");
      default:
        return undefined;
    }
  }

  const handleSuccess = () => {
    setStatus("success");
    openModal("signIn");
  };

  return (
    <BasicModal
      title={getTitle()}
      description={getDescription()}
      open={active === "setPassword"}
      onClose={closeModal}
    >
      <AuthForm
        action={setPassword}
        onError={() => setStatus("error")}
        onSuccess={handleSuccess}
        submitText={t("reset_password.submit")}
      >
        <FormField
          label={t("form.new_password")}
          htmlFor={`${formId}-password`}
          required
        >
          <Password
            name="password"
            id={`${formId}-password`}
            required
            autoComplete="new-password"
            minLength={6}
          />
        </FormField>

        {id && <input type="hidden" name="id" defaultValue={id} />}
        {code && <input type="hidden" name="code" defaultValue={code} />}
      </AuthForm>
    </BasicModal>
  );
}
