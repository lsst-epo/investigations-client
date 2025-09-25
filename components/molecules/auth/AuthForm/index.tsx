"use client";

import {
  FunctionComponent,
  PropsWithChildren,
  useActionState,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import Submit from "@/components/atomic/Submit";
import * as Styled from "./styles";

interface AuthFormProps {
  className?: string;
  initialState?: FormState;
  onSuccess?: (state: FormSuccess) => void;
  onError?: (state: FormError) => void;
  submitText?: string;
  pendingText?: string;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
}

const AuthForm: FunctionComponent<PropsWithChildren<AuthFormProps>> = ({
  action,
  initialState = null,
  submitText,
  pendingText,
  onSuccess,
  onError,
  children,
  className,
}) => {
  const [state, formAction] = useActionState(action, initialState);
  const { t } = useTranslation();

  const getButtonText = (pending: boolean) => {
    if (pending) {
      return pendingText || t("form.submitting");
    } else {
      return submitText || t("form.submit");
    }
  };

  useEffect(() => {
    if (state?.status === "success") {
      return onSuccess && onSuccess(state);
    }

    if (state?.status === "error") {
      return onError && onError(state);
    }
  }, [state]);

  return (
    <Styled.Form className={className} action={formAction}>
      {children}
      <Submit>{getButtonText}</Submit>
      <output>{state?.message}</output>
    </Styled.Form>
  );
};

AuthForm.displayName = "Organism.AuthForm";

export default AuthForm;
