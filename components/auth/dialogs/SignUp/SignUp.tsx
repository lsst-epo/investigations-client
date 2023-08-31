"use client";

import { useState } from "react";
import { BasicModal, Button, Input } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/components/auth/AuthDialogManagerContext";
import Submit from "@/components/form/Submit";
import { registerEducator, registerStudent } from "./actions";
import { useTranslation } from "@/lib/i18n/client";

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
        <div>
          <label htmlFor="signUpEmail">{t("form.email")}</label>
          <Input
            name="email"
            id="signUpEmail"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="registerFirstName">{t("form.first_name")}</label>
          <Input
            name="firstName"
            id="registerFirstName"
            type="text"
            autoComplete="given-name"
          />
        </div>
        <div>
          <label htmlFor="registerLastName">{t("form.last_name")}</label>
          <Input
            name="lastName"
            id="registerLastName"
            type="text"
            autoComplete="family-name"
          />
        </div>
        <div>
          <label htmlFor="signUpPassword">{t("form.password")}</label>
          <Input
            name="password"
            id="signUpPassword"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Submit>
          {(pending) =>
            t(pending ? "register.submit_pending" : "register.submit")
          }
        </Submit>
        <Button
          type="button"
          styleAs="secondary"
          onClick={() => {
            setStatus(null);
            closeModal();
          }}
        >
          {t("form.cancel")}
        </Button>
        <output>
          {status === "error" && <p>{t("register.error_message")}</p>}
        </output>
      </form>
    </BasicModal>
  );
}
