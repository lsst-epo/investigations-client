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
import ResendActivationButton from "@/components/molecules/auth/ResendActivationButton";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const CredentialSignIn: FunctionComponent<
  PropsWithChildren<{ onSuccess?: () => void }>
> = ({ onSuccess, children }) => {
  const { t } = useTranslation();
  const [{ userToResend }, , removeCookie] = useCookies(["userToResend"]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  const signInAction = async (
    _state: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      return { status: "error", message: data.message };
    }
    router.refresh();
    return { status: "success", message: data.message };
  };

  return userToResend && error ? (
    <ResendActivationButton message={error} />
  ) : (
    <>
      <AuthForm
        action={signInAction}
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
