"use client";

import { Button } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import { useTranslation } from "react-i18next";
import InteractionDescription from "@/components/atomic/InteractionDescription";

interface Props {
  labels?: {
    login?: string;
    description?: string;
  };
}

export default function SignIn({ labels }: Props) {
  const { t } = useTranslation();
  const { openModal } = useAuthDialogManager();

  return (
    <InteractionDescription description={labels?.description}>
      {(id) => (
        <Button
          className="sign-in"
          styleAs="educator"
          onClick={() => {
            openModal("signIn");
          }}
          aria-describedby={id}
        >
          {labels?.login || t("auth.log_in_to_continue")}
        </Button>
      )}
    </InteractionDescription>
  );
}
