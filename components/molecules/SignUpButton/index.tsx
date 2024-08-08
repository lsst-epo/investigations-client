"use client";

import { FunctionComponent, MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import * as Styled from "./styles";

interface SignUpProps {
  className?: string;
  onClickCallback?: MouseEventHandler<HTMLButtonElement>;
}

const SignUp: FunctionComponent<SignUpProps> = ({
  className,
  onClickCallback,
}) => {
  const { t } = useTranslation();
  const { openModal } = useAuthDialogManager();

  return (
    <Styled.SignUp
      className={className}
      onClick={(e) => {
        openModal("selectGroup");
        onClickCallback && onClickCallback(e);
      }}
    >
      {t("auth.sign_up")}
    </Styled.SignUp>
  );
};

SignUp.displayName = "Auth.Buttons.SignUp";

export default SignUp;
