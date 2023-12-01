"use client";

import { Button } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

export default function SignIn() {
  const { t } = useTranslation();
  const { openModal } = useAuthDialogManager();

  return (
    <>
      <Button
        className="sign-in"
        styleAs="educator"
        onClick={() => {
          openModal("signIn");
        }}
      >
        {t("auth.log_in_to_continue")}
      </Button>
      <Styled.ButtonLabel>
        {t("auth.continue_w_login_label")}
      </Styled.ButtonLabel>
    </>
  );
}
