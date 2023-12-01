"use client";

import { FunctionComponent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import saveEducatorAnswers from "@/components/educator-schema/saveAnswersAction";
import saveStudentAnswers from "@/components/student-schema/saveAnswersAction";
import { Answers, InvestigationId } from "@/types/answers";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import Toaster from "@/components/layout/Toaster";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import SaveButton from "./SaveButton";
import * as Styled from "./styles";
import AuthDialogs from "@/components/auth/AuthDialogs";

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

  const [status, setStatus] = useState<FormStatus>(
    userStatus === "pending" ? "statusError" : null
  );

  const resetForm = useCallback(() => setStatus(null), []);

  if (!investigationId) {
    console.error("No investigation id provided");
    return null;
  }

  const saveAnswers = async () => {
    try {
      const storedAnswers = localStorage.getItem(`${investigationId}_answers`);
      if (!storedAnswers || !Object.values(JSON.parse(storedAnswers)).length)
        return setStatus("emptyError");

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
        setStatus("refreshError");
      } else if (result === "statusError") {
        setStatus("statusError");
      } else {
        setStatus("success");
      }
    } catch (error) {
      setStatus("mutationError");
    }
  };

  const toastIcon: Record<NonNullable<FormStatus>, string> = {
    success: "Checkmark",
    refreshError: "Close",
    statusError: "Close",
    mutationError: "Close",
    emptyError: "Close",
  };

  const toastText: Record<NonNullable<FormStatus>, string> = {
    success: t("answers.save_form.success_message", {
      context: !user ? "unauth" : undefined,
    }),
    refreshError: t("answers.save_form.refresh_error_message"),
    statusError: t("answers.save_form.status_error_message"),
    mutationError: t("answers.save_form.mutation_error_message"),
    emptyError: t("answers.save_form.empty_error_message"),
  };

  const message =
    status === null
      ? undefined
      : {
          icon: toastIcon[status],
          title:
            status === "success"
              ? t("answers.save_form.success")
              : t("answers.save_form.error"),
          text: toastText[status],
          additionalContent: !user ? (
            <>
              {/* <SignIn />
              <SignUp /> */}
            </>
          ) : undefined,
        };

  return (
    <>
      <Styled.Form
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        action={saveAnswers}
        id="saveForm"
      >
        <Styled.Checkpoint>
          <Styled.CheckpointIcon>
            <IconComposer icon="Thumbtack" size="1.5em" />
          </Styled.CheckpointIcon>
          <Styled.CheckpointDivider />
          {t("answers.save_form.checkpoint")}
        </Styled.Checkpoint>
        <SaveButton />
      </Styled.Form>
      <Toaster
        forIds={["saveForm"]}
        isVisible={status !== null}
        onCloseCallback={() => resetForm()}
        message={message}
      ></Toaster>
      <AuthDialogs isAuthenticated={!!user} />
    </>
  );
};

SaveForm.displayName = "Answers.Save";

export default SaveForm;
