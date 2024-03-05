"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { usePathToRevalidate } from "@/components/auth/clientHelpers";
import { getTokens, authenticateUser } from "./actions";

export default function SSOButton({
  onError: onSignInError,
}: {
  onError: () => void;
}) {
  const { t } = useTranslation();
  const { pendingGroup } = useAuthDialogManager();
  const pathToRevalidate = usePathToRevalidate();
  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    flow: "auth-code",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleError() {
    onSignInError();
  }

  async function handleSuccess(res) {
    const { code } = res;
    // eslint-disable-next-line no-console
    console.log("handleSuccess auth code", code);
    const { id_token: idToken } = await getTokens(code);
    // eslint-disable-next-line no-console
    console.log("handleSuccess idToken", idToken);
    try {
      if (!idToken) return handleError();
      await authenticateUser(pendingGroup, idToken, pathToRevalidate);
    } catch (error) {
      handleError();
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={() => {
        setIsLoading(true);
        login();
      }}
      styleAs="tertiary"
      disabled={isLoading}
      isBlock
    >
      {isLoading
        ? t("sign_in.loading_google")
        : t("sign_in.continue_with_google")}
    </Button>
  );
}

Button.displayName = "GoogleSSO.Button";
