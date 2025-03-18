import { FunctionComponent } from "react";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import { useTranslation } from "@/lib/i18n/server";
import SignIn from "@/components/molecules/auth/SignInButton";
import SignUp from "@/components/molecules/auth/SignUpButton";
import InteractionDescription from "@/components/atomic/InteractionDescription";

const SignedOut: FunctionComponent<{
  firstPage: string;
  locale: string;
}> = async ({ firstPage, locale }) => {
  const { t } = await useTranslation(locale, "translation");
  return (
    <>
      <SignIn />
      <InteractionDescription description={t("auth.continue_wo_login_label")}>
        {(id) => (
          <Buttonish
            styleAs="tertiary"
            url={firstPage}
            text={t("auth.continue_wo_login_button")}
            prefetch
            aria-describedby={id}
          />
        )}
      </InteractionDescription>
      <SignUp />
    </>
  );
};

SignedOut.displayName = "Organisms.LandingSignedOut";

export default SignedOut;
