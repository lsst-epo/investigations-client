import { PropsWithChildren, forwardRef } from "react";
import { useFocusTrap, useKeyDownEvent } from "@/hooks";
import * as Styled from "./styles";

interface BaseModalProps {
  isOpen?: boolean;
  closeModal?: () => void;
}

const BaseModal = forwardRef<HTMLDivElement, PropsWithChildren<BaseModalProps>>(
  ({ isOpen = false, closeModal, children }, ref) => {
    const handleKeyDown = ({ key }: { key: string }) => {
      if (!isOpen) return;
      if (key === "Escape") {
        closeModal && closeModal();
      }
    };

    useFocusTrap(ref, isOpen);
    useKeyDownEvent(handleKeyDown);

    return (
      <Styled.Dialog open={isOpen} ref={ref}>
        <Styled.Backdrop open={isOpen} />
        {children}
      </Styled.Dialog>
    );
  }
);

BaseModal.displayName = "Layout.Modal.Base";

export default BaseModal;
