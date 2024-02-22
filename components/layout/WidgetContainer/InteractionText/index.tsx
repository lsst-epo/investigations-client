import { FunctionComponent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { useFocusTrap, useOnClickOutside } from "@/hooks";
import * as Toast from "@/layout/Toaster/styles";
import * as Styled from "./styles";

interface InstructionsProps {
  text: string;
}

const Instructions: FunctionComponent<InstructionsProps> = ({ text }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    return setOpen(true);
  };

  const handleClose = () => {
    if (isOpen) {
      openRef.current && openRef.current.focus();
      return setOpen(false);
    }
  };

  const instructionTitleId = "instructionTitle";
  const instructionId = "instructionDesc";

  useFocusTrap(dialogRef, isOpen);
  useOnClickOutside(dialogRef, handleClose);

  return (
    <Styled.InstructionsContainer>
      <Styled.InfoButton ref={openRef} onClick={handleOpen}>
        <IconComposer icon="Info" size="1.5em" />
        <span>{t("widgets.help")}</span>
      </Styled.InfoButton>
      <Styled.ToastBar
        style={{
          animation: isOpen
            ? "slideIn var(--animation-time,0s) ease forwards"
            : "slideOut var(--animation-time,0s) ease forwards",
        }}
        hidden={!isOpen}
      >
        <Toast.ToastContainer
          role="dialog"
          aria-modal="true"
          aria-labelledby={instructionTitleId}
          aria-describedby={instructionId}
          ref={dialogRef}
        >
          <Toast.ToastIcon
            style={{
              color: "var(--turquoise70, #058B8C)",
              backgroundColor: "transparent",
            }}
          >
            <IconComposer icon="Info" size="2em" />
          </Toast.ToastIcon>
          <div role="status">
            <h3 id={instructionTitleId}>{t("page.interaction")}</h3>
            <div
              id={instructionId}
              className="c-content-rte"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
          <Toast.CloseToast onClick={handleClose}>
            <IconComposer size="1em" icon="Close" />
          </Toast.CloseToast>
        </Toast.ToastContainer>
      </Styled.ToastBar>
    </Styled.InstructionsContainer>
  );
};

Instructions.displayName = "Layout.WidgetContainer.Instructions";

export default Instructions;
