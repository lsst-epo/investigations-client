import { PropsWithChildren, forwardRef } from "react";
import { useFocusTrap, useKeyDownEvent } from "@/hooks";
import * as Styled from "./styles";

interface BaseModalProps {
  isOpen?: boolean;
  closeModal?: () => void;
  id: string;
}

const BaseModal = forwardRef<HTMLDivElement, PropsWithChildren<BaseModalProps>>(
  (props: PropsWithChildren<BaseModalProps>, ref) => {
    const { isOpen = false, closeModal, id, children } = props;
    const handleKeyDown = ({ key }: { key: string }) => {
      if (!isOpen) return;
      if (key === "Escape") {
        closeModal && closeModal();
      }
    };

    useFocusTrap(ref, isOpen);
    useKeyDownEvent(handleKeyDown);

    return (
      <Styled.Dialog data-modal-open={isOpen} ref={ref}>
        <Styled.Backdrop open={isOpen} />
        <div role={isOpen ? "dialog" : "generic"} aria-modal={isOpen} id={id}>
          {children}
        </div>
      </Styled.Dialog>
    );
  }
);

BaseModal.displayName = "Layout.Modal.Base";

export default BaseModal;
