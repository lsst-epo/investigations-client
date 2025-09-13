"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { usePathToRevalidate } from "@/components/auth/clientHelpers";
import { getTokens } from "./actions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  function handleError() {
    onSignInError();
  }

  async function handleSuccess(res) {
    const { code } = res;
    const { id_token: idToken } = await getTokens(code);
    try {
      if (!idToken) return handleError();
      await fetch("/api/cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: idToken,
          group: pendingGroup,
          path: pathToRevalidate,
        }),
      });
      router.refresh();
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
