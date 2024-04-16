"use client";
import { FunctionComponent, PropsWithChildren } from "react";
import { ErrorBoundary as BaseErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

const ErrorBoundary: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <BaseErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <Styled.Alert role="alert">
            <h3>{t("contact-form.error")}</h3>
            <Styled.Error>{error.message}</Styled.Error>
          </Styled.Alert>
        );
      }}
    >
      {children}
    </BaseErrorBoundary>
  );
};

ErrorBoundary.displayName = "Atomic.ErrorBoundary";

export default ErrorBoundary;
