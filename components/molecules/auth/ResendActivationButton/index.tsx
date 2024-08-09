"use client";
import { FunctionComponent, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import Button from "@rubin-epo/epo-react-lib/Button";
import resendActivationEmail from "@/lib/auth/actions/resendActivation";
import InteractionDescription from "@/components/atomic/InteractionDescription";

const ResendActivationButton: FunctionComponent<{
  message?: string | null;
}> = ({ message }) => {
  const [isPending, startTransition] = useTransition();
  const [sentStatus, setSentStatus] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <>
      <span>
        {message || t("auth.logged_in_status_issue", { status: "pending" })}
      </span>
      <InteractionDescription description={sentStatus} isOutput>
        {(id) => (
          <Button
            id={id}
            type="button"
            onClick={() => {
              startTransition(async () => {
                const result = await resendActivationEmail();

                setSentStatus(
                  t("resend_activation.submit", {
                    context: result?.resendActivation ? "success" : "error",
                  })
                );
              });
            }}
            isInactive={isPending || !!sentStatus}
          >
            {isPending
              ? t("resend_activation.submit_pending")
              : t("resend_activation.submit")}
          </Button>
        )}
      </InteractionDescription>
    </>
  );
};

ResendActivationButton.displayName = "Molecules.ResendActivationButton";

export default ResendActivationButton;
