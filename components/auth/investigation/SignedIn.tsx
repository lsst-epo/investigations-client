import { FunctionComponent } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import SignOut from "../buttons/SignOut";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";

const SignedIn: FunctionComponent<{
  name: string;
  status?: string;
  firstPage: string;
  signOutRedirect: string;
  locale: string;
}> = async ({ name, status, firstPage, signOutRedirect, locale }) => {
  const { t } = await useTranslation(locale, "translation");
  return (
    <>
      <strong>{t("auth.logged_in_as", { name })}</strong>
      {status !== "active" && (
        <span>{t("auth.logged_in_status_issue", { status })}</span>
      )}
      <Buttonish
        as={Link}
        text={t("investigation.start")}
        styleAs="educator"
        url={firstPage}
        isInactive={status !== "active"}
        isBlock
      />
      <SignOut redirectTo={signOutRedirect} />
    </>
  );
};

SignedIn.displayName = "Auth.SignedIn";

export default SignedIn;
