"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

const PrintButton: FunctionComponent<{ text?: string | null }> = ({ text }) => {
  const { t } = useTranslation();
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    } else {
      console.error("Print is not available on this device");
    }
  };

  return (
    <Styled.PrintButton icon="Pdf" onClick={handlePrint} isBlock>
      {text || t("translation.print")}
    </Styled.PrintButton>
  );
};

PrintButton.displayName = "Button.Print";

export default PrintButton;
