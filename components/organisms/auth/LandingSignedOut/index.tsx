import { FunctionComponent, use } from "react";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import { useTranslation } from "@/lib/i18n/server";
import SignIn from "@/components/molecules/auth/SignInButton";
import SignUp from "@/components/molecules/auth/SignUpButton";
import InteractionDescription from "@/components/atomic/InteractionDescription";

const SignedOut: FunctionComponent<{
  firstPage: string;
  locale: string;
}> = ({ firstPage, locale }) => {
  const { t } = use(useTranslation(locale, "translation"));
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
