"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import Button from "@rubin-epo/epo-react-lib/Button";
import saveEducatorAnswers from "@/components/educator-schema/saveAnswersAction";
import saveStudentAnswers from "@/components/student-schema/saveAnswersAction";
import { Answers, InvestigationId } from "@/types/answers";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import SaveButton from "./SaveButton";
import * as Styled from "./styles";

type FormStatus =
  | "emptyError"
  | "refreshError"
  | "mutationError"
  | "statusError"
  | "success"
  | null;

const SaveForm: FunctionComponent<{
  investigationId: InvestigationId;
  user?: ReturnType<typeof getUserFromJwt>;
  userStatus?: string;
}> = ({ investigationId, user, userStatus }) => {
  const { t } = useTranslation();
  const { openModal } = useAuthDialogManager();

  if (!investigationId) {
    console.error("No investigation id provided");
    return null;
  }

  const toastText: Record<NonNullable<FormStatus>, string> = {
    success: t("answers.save_form.success_message", {
      context: !user ? "unauth" : undefined,
    }),
    refreshError: t("answers.save_form.refresh_error_message"),
    statusError: t("answers.save_form.status_error_message"),
    mutationError: t("answers.save_form.mutation_error_message"),
    emptyError: t("answers.save_form.empty_error_message"),
  };

  const saveAnswers = async () => {
    try {
      const storedAnswers = localStorage.getItem(`${investigationId}_answers`);
      if (!storedAnswers || !Object.values(JSON.parse(storedAnswers)).length) {
        toast.error(
          <>
            <h3>{t("answers.save_form.error")}</h3>
            <span>{toastText.emptyError}</span>
          </>
        );
        return;
      }

      const saveAction = user
        ? user.group === "educators"
          ? saveEducatorAnswers
          : saveStudentAnswers
        : () => "success";
      const result = await saveAction(
        investigationId,
        JSON.parse(storedAnswers) as Answers
      );

      if (result === "refreshError") {
        toast.error(
          <>
            <h3>{t("answers.save_form.error")}</h3>
            <span>{toastText[result]}</span>
          </>
        );
      } else if (result === "statusError") {
        toast.error(
          <>
            <h3>{t("answers.save_form.error")}</h3>
            <span>{toastText[result]}</span>
          </>
        );
      } else {
        toast.success(
          <>
            <h3>{t("answers.save_form.success")}</h3>
            <span>{toastText.success}</span>
            {!user && (
              <>
                <Button
                  onClick={() => {
                    toast.dismiss();
                    return openModal("signIn");
                  }}
                >
                  {t("auth.log_in")}
                </Button>
                <Styled.SignUp onClickCallback={() => toast.dismiss()} />
              </>
            )}
          </>
        );
      }
    } catch (error) {
      toast.error(
        <>
          <h3>{t("answers.save_form.error")}</h3>
          <span>{toastText.mutationError}</span>
        </>
      );
    }
  };

  const hasStatusIssue = !!(user && userStatus !== "active");

  return (
    <Styled.Form action={saveAnswers} id="saveForm">
      <Styled.Checkpoint>
        <Styled.CheckpointIcon>
          <IconComposer icon="Thumbtack" size="1.5em" />
        </Styled.CheckpointIcon>
        <Styled.CheckpointDivider />
        {t("answers.save_form.checkpoint")}
      </Styled.Checkpoint>
      <SaveButton isDisabled={hasStatusIssue} />
      {hasStatusIssue && (
        <span>{t("auth.logged_in_status_issue", { status: userStatus })}</span>
      )}
    </Styled.Form>
  );
};

SaveForm.displayName = "Answers.Save";

export default SaveForm;
