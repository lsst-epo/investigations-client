"use client";

import { Button } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { useTranslation } from "react-i18next";
import InteractionDescription from "@/components/atomic/InteractionDescription";

export default function SignIn() {
  const { t } = useTranslation();
  const { openModal } = useAuthDialogManager();

  return (
    <InteractionDescription description={t("auth.continue_w_login_label")}>
      {(id) => (
        <Button
          className="sign-in"
          styleAs="educator"
          onClick={() => {
            openModal("signIn");
          }}
          aria-describedby={id}
        >
          {t("auth.log_in_to_continue")}
        </Button>
      )}
    </InteractionDescription>
  );
}
