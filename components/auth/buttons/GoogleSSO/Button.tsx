"use client";

import type { GoogleCredentialResponse } from "@react-oauth/google";
import { Button } from "@rubin-epo/epo-react-lib";
import { useTranslation } from "react-i18next";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { usePathToRevalidate } from "@/components/auth/clientHelpers";
import { authenticateEducator, authenticateStudent } from "./actions";
import { GoogleLogin } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";

export default function SSOButton({
  onError: onSignInError,
  buttonWidth
}: {
  onError: () => void;
  buttonWidth: number;
}) {
  const {
    // t,
    i18n: { language },
  } = useTranslation();
  const { pendingGroup } = useAuthDialogManager();
  const pathToRevalidate = usePathToRevalidate();
  // const login = useGoogleLogin({
  //   onSuccess: handleSuccess,
  //   onError: handleError,
  // });

  function handleError() {
    onSignInError(response);
  }

  async function handleSuccess(credentialResponse: GoogleCredentialResponse) {
    try {
      if (!credentialResponse.credential) return handleError();

      if (pendingGroup === "educators") {
        await authenticateEducator(
          credentialResponse.credential,
          pathToRevalidate
        );
      } else {
        await authenticateStudent(
          credentialResponse.credential,
          pathToRevalidate
        );
      }
    } catch (error) {
      onSignInError();
    }
  }

  // return (
  //   <Button onClick={() => login()} styleAs="tertiary">
  //     {t("sign_in.continue_with_google")}
  //   </Button>
  // );
  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      locale={language}
      shape="rectangle"
      size="large"
      text="continue_with"
      theme="outline"
      type="standard"
      width={buttonWidth}
      useOneTap
    />
  );
}

Button.displayName = "GoogleSSO.Button";
