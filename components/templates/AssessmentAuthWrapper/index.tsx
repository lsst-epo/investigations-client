"use client";

import { getUserFromJwt } from "@/components/auth/serverHelpers";
import { PropsWithChildren } from "react";
import * as Styled from "./styles";
import SignIn from "@/components/molecules/auth/SignInButton";
import { Button } from "@rubin-epo/epo-react-lib";
import { useTranslation } from "react-i18next";

interface Props extends PropsWithChildren {
  user: ReturnType<typeof getUserFromJwt>;
  title?: string | null;
}

export default function AssessmentAuthWrapper({
  user,
  title,
  children,
}: Props) {
  const { t } = useTranslation();

  return user?.group === "educators" ? (
    <>{children}</>
  ) : (
    <Styled.PageContainer
      bgColor="orange05"
      paddingSize="medium"
      width="narrow"
    >
      <div className="c-content-rte t-align-center">
        <h1>{t("assessment.auth_header")}</h1>
        <p>{t("assessment.auth_message")}</p>
      </div>
      <Styled.AuthWrapper>
        <SignIn
          labels={{
            login: t("auth.log_in"),
          }}
        />
        <div>
          <Button as="a" href="/">
            {t("nav.back")}
          </Button>
        </div>
      </Styled.AuthWrapper>
    </Styled.PageContainer>
  );
}
