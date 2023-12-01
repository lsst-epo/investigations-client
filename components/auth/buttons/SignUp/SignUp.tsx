"use client";

import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

export default function SignIn({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { openModal } = useAuthDialogManager();

  return (
    <Styled.SignUp
      className={className}
      onClick={() => {
        openModal("selectGroup");
      }}
    >
      {t("auth.sign_up")}
    </Styled.SignUp>
  );
}
