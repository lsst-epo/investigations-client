"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { BasicModal } from "@rubin-epo/epo-react-lib";
import { useAuthDialogManager } from "@/components/auth/AuthDialogManagerContext";
import * as Styled from "./styles";

export default function SelectGroup() {
  const { active, openModal, closeModal, setPendingGroup } =
    useAuthDialogManager();

  const { t } = useTranslation();

  return (
    <BasicModal
      title={t("join.title")}
      description={t("join.description")}
      open={active === "selectGroup"}
      onClose={closeModal}
    >
      <Styled.Middle>
        <Styled.StudentButton
          onClick={() => {
            setPendingGroup("students");
            openModal("selectProvider");
          }}
        >
          <Image role="presentation" src="/assets/roles/student.svg" alt="" width={64} height={64} />
          <div>{t("join.as_students")}</div>
        </Styled.StudentButton>
        <Styled.EducatorButton
          onClick={() => {
            setPendingGroup("educators");
            openModal("selectProvider");
          }}
        >
          <Image role="presentation" src="/assets/roles/educator.svg" alt="" width={55} height={64} />
          <div>{t("join.as_educators")}</div>
        </Styled.EducatorButton>
      </Styled.Middle>
      <Styled.SignInButton onClick={() => openModal("signIn")}>
        {t("join.sign_in_link")}
      </Styled.SignInButton>
    </BasicModal>
  );
}
