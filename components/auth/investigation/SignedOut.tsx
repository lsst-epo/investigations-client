import { FunctionComponent } from "react";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import SignIn from "../buttons/SignIn";
import SignUp from "../buttons/SignUp";
import * as Styled from "./styles";

const SignedOut: FunctionComponent<{
  firstPage: string;
  locale: string;
}> = async ({ firstPage, locale }) => {
  const { t } = await useTranslation(locale, "translation");
  return (
    <>
      <SignIn />
      <Buttonish
        as={Link}
        styleAs="tertiary"
        url={firstPage}
        text={t("auth.continue_wo_login_button")}
      />
      <Styled.LinkLabel>{t("auth.continue_wo_login_label")}</Styled.LinkLabel>
      <SignUp />
    </>
  );
};

SignedOut.displayName = "Auth.SignedOut";

export default SignedOut;
