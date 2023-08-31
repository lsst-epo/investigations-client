"use client";

import { useState } from "react";
import Submit from "@/components/form/Submit";
import { useTranslation } from "@/lib/i18n/client";
import { saveAnswers } from "./actions";

export default function SaveForm() {
  const { t } = useTranslation();

  const [status, setStatus] = useState<"error" | null>(null);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      action={async () => {
        try {
          const data = await saveAnswers();
          console.log(data);
        } catch (error) {
          setStatus("error");
        }
      }}
      aria-label={t("answers.save_form.label") ?? undefined}
    >
      <Submit icon="FloppyDisk">
        {(pending) =>
          t(
            pending
              ? "answers.save_form.submit_pending"
              : "answers.save_form.submit"
          )
        }
      </Submit>
      <output>
        {status === "error" && <p>{t("answers.save_form.error_message")}</p>}
      </output>
    </form>
  );
}
