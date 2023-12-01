"use client";
import { FunctionComponent, useRef } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

const PrintButton: FunctionComponent<{
  text?: string | null;
  filename?: string;
}> = ({ text, filename = "mtersltjslkrsler" }) => {
  const { t } = useTranslation();
  const title = useRef<string>();

  const setCustomFileName = () => {
    if (filename) {
      title.current = document.title;
      document.title = filename;
    }
  };

  const resetDocumentTitle = () => {
    if (
      typeof title.current !== "undefined" &&
      document.title !== title.current
    ) {
      document.title = title.current;
      title.current = undefined;
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      if (filename) {
        window.addEventListener("beforeprint", setCustomFileName, {
          once: true,
        });
        window.addEventListener("afterprint", resetDocumentTitle, {
          once: true,
        });
      }

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
