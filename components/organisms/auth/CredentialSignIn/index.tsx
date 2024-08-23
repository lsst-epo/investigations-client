import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import Input from "@rubin-epo/epo-react-lib/Input";
import FormLabel from "@/components/atomic/FormLabel";
import AuthForm from "@/components/molecules/auth/AuthForm";
import signIn from "@/lib/api/auth/actions/signIn";
import ResendActivationButton from "@/components/molecules/auth/ResendActivationButton";
import { useCookies } from "react-cookie";

const CredentialSignIn: FunctionComponent<
  PropsWithChildren<{ onSuccess?: () => void }>
> = ({ onSuccess, children }) => {
  const { t } = useTranslation();
  const [{ userToResend }, , removeCookie] = useCookies(["userToResend"]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  return userToResend && error ? (
    <ResendActivationButton message={error} />
  ) : (
    <>
      <AuthForm
        action={signIn}
        submitText={t("sign_in.submit")}
        pendingText={t("sign_in.submit_pending")}
        onError={(error) => {
          setError(error.message);
        }}
        onSuccess={onSuccess}
      >
        {t("auth.log_in_w_email")}
        <FormLabel>
          {t("form.email")}
          <Input name="email" type="email" autoComplete="email" required />
        </FormLabel>
        <FormLabel>
          {t("form.password")}
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </FormLabel>
        {children}
      </AuthForm>
    </>
  );
};

CredentialSignIn.displayName = "Organism.CredentialSignIn";

export default CredentialSignIn;
