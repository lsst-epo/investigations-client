"use client";
import { FunctionComponent, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import Button from "@rubin-epo/epo-react-lib/Button";
import { resendActivationEmail } from "./actions";
import InteractionDescription from "@/components/atomic/InteractionDescription";

const ResendVerificationButton: FunctionComponent<{ status?: string }> = ({
  status,
}) => {
  const [isPending, startTransition] = useTransition();
  const [sentStatus, setSentStatus] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <>
      <span>{t("auth.logged_in_status_issue", { status })}</span>
      <InteractionDescription description={sentStatus} isOutput>
        {(id) => (
          <Button
            id={id}
            onClick={() => {
              startTransition(async () => {
                const result = await resendActivationEmail();

                setSentStatus(
                  t("auth.resend_email", {
                    context: result?.resendActivation ? "success" : "error",
                  })
                );
              });
            }}
            isInactive={isPending || !!sentStatus}
          >
            {t("auth.resend_email")}
          </Button>
        )}
      </InteractionDescription>
    </>
  );
};

ResendVerificationButton.displayName = "Molecules.ResendVerificationButton";

export default ResendVerificationButton;
