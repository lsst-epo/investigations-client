import { FunctionComponent, ReactNode } from "react";
import { useTranslation } from "@/lib/i18n";
import SignOut from "@/components/molecules/SignOutButton";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import ResendVerificationButton from "@/components/molecules/ResendVerificationButton";

const SignedIn: FunctionComponent<{
  name: string;
  status?: string;
  firstPage: string;
  signOutRedirect: string;
  locale: string;
}> = async ({ name, status, firstPage, signOutRedirect, locale }) => {
  const { t } = await useTranslation(locale, "translation");
  const actions: Record<string, ReactNode> = {
    pending: <ResendVerificationButton {...{ status }} />,
    active: (
      <Buttonish
        text={t("investigation.start")}
        styleAs="educator"
        url={firstPage}
        isBlock
        prefetch
      />
    ),
    default: (
      <Buttonish
        text={t("investigation.start")}
        styleAs="educator"
        url={firstPage}
        isInactive
        isBlock
        prefetch
      />
    ),
  };

  const getNextAction = (status = "default") => {
    if (Object.hasOwn(actions, status)) {
      return actions[status];
    }

    return actions.default;
  };

  return (
    <>
      <strong>{t("auth.logged_in_as", { name })}</strong>
      {getNextAction(status)}
      <SignOut redirectTo={signOutRedirect} />
    </>
  );
};

SignedIn.displayName = "Organisms.LandingSignedIn";

export default SignedIn;
