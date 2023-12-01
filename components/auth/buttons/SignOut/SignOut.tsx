"use client";

import { useTranslation } from "react-i18next";
import Button from "@rubin-epo/epo-react-lib/Button";
import { signOut } from "./actions";

export default function SignOut({ redirectTo }: { redirectTo: string }) {
  const { t } = useTranslation();
  const signOutWithRedirect = signOut.bind(null, redirectTo);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
