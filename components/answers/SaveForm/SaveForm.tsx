"use client";

import { useState } from "react";
import Submit from "@/components/form/Submit";
import { useTranslation } from "react-i18next";
import saveEducatorAnswers from "@/components/educator-schema/saveAnswersAction";
import saveStudentAnswers from "@/components/student-schema/saveAnswersAction";
import { Answers, InvestigationId } from "@/types/answers";
import { getUserFromJwt } from "@/components/auth/serverHelpers";

export default function SaveForm({
  investigationId,
  user,
  userStatus,
}: {
  investigationId: InvestigationId;
  user?: ReturnType<typeof getUserFromJwt>;
  userStatus?: string;
}) {
  const { t } = useTranslation();

  const [status, setStatus] = useState<
    | "emptyError"
    | "refreshError"
    | "mutationError"
    | "statusError"
    | "success"
    | null
  >(userStatus === "pending" ? "statusError" : null);

  if (!investigationId || !user) return null;

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      action={async () => {
        try {
          const storedAnswers = localStorage.getItem(
            `${investigationId}_answers`
          );
          if (
            !storedAnswers ||
            !Object.values(JSON.parse(storedAnswers)).length
          )
            return setStatus("emptyError");

          const saveAction =
            user.group === "educators"
              ? saveEducatorAnswers
              : saveStudentAnswers;
          const result = await saveAction(
            investigationId,
            JSON.parse(storedAnswers) as Answers
          );
          if (result === "refreshError") {
            setStatus("refreshError");
          } else if (result === "statusError") {
            setStatus("statusError");
          } else {
            setStatus("success");
          }
        } catch (error) {
          setStatus("mutationError");
        }
      }}
      aria-label={t("answers.save_form.label") ?? undefined}
    >
      <Submit disabled={status !== null} icon="FloppyDisk">
        {(pending) =>
          t(
            pending
              ? "answers.save_form.submit_pending"
              : "answers.save_form.submit"
          )
        }
      </Submit>
      <output>
        {status === "success" && (
          <p>{t("answers.save_form.success_message")}</p>
        )}
        {status === "emptyError" && (
          <p>{t("answers.save_form.empty_error_message")}</p>
        )}
        {status === "refreshError" && (
          <p>{t("answers.save_form.refresh_error_message")}</p>
        )}
        {status === "mutationError" && (
          <p>{t("answers.save_form.mutation_error_message")}</p>
        )}
        {status === "statusError" && (
          <p>{t("answers.save_form.status_error_message")}</p>
        )}
      </output>
    </form>
  );
}
