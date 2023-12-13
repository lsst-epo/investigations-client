"use client";
import { FunctionComponent, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Answers } from "@/types/answers";
import { StoredQuestion } from "@/contexts/Questions";
import * as Styled from "./styles";

interface XlsxButtonProps {
  answers: Answers;
  questions: Array<StoredQuestion>;
  investigation?: string;
  name?: string;
}

const XlsxButton: FunctionComponent<PropsWithChildren<XlsxButtonProps>> = ({
  answers,
  questions,
  investigation,
  name,
  children,
}) => {
  const { t } = useTranslation();

  const handleExport = () => {
    const canvases = Array.from(document.getElementsByTagName("canvas"));
    const images = canvases.map((canvas) =>
      canvas.toDataURL("image/jpeg", 0.9)
    );

    fetch("/api/xlsx", {
      method: "POST",
      body: JSON.stringify({ answers, questions, investigation, name, images }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `${name || investigation}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <Styled.ExportButton icon="Doc" onClick={handleExport} isBlock>
      {children || t("translation.export")}
    </Styled.ExportButton>
  );
};

export default XlsxButton;
