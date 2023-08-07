"use client";

import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/components/auth/AuthDialogManagerContext";
import { usePathToRevalidate } from "@/components/auth/clientHelpers";
import { authenticateEducator, authenticateStudent } from "./actions";
import type { GoogleCredentialResponse } from "@react-oauth/google";

export default function SSOButton({
  onError: onSignInError,
}: {
  onError: () => void;
}) {
  const { pendingGroup } = useAuthDialogManager();

  const pathToRevalidate = usePathToRevalidate();

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

  function handleError() {
    console.error("error");
    onSignInError();
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      theme="outline"
      size="large"
    />
  );
}

Button.displayName = "GoogleSSO.Button";
