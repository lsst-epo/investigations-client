"use client";

import { useTranslation } from "react-i18next";
import Button from "@rubin-epo/epo-react-lib/Button";
import signOut from "@/lib/auth/actions/signOut";

export default function SignOut({ redirectTo }: { redirectTo: string }) {
  const { t } = useTranslation();
  const signOutWithRedirect = signOut.bind(null, redirectTo);

  return (
    <form
      action={signOutWithRedirect}
      // clear stored answers from browser storage
      onSubmit={() => localStorage.clear()}
    >
      <Button styleAs="tertiary" isBlock>
        {t("translation:auth.log_out")}
      </Button>
    </form>
  );
}
