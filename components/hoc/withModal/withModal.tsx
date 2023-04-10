import { ComponentType, useState, useRef } from "react";
import useFocusTrap from "@/hooks/useFocusTrap";
import { getDisplayName } from "@/components/lib/utils";
import * as Styled from "./styles";

export interface ModalInnerProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

function withModal<T extends object>(
  WrappedComponent: ComponentType<T & ModalInnerProps>
) {
  const WithModal = (props: T) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useFocusTrap(modalRef, isOpen);

    return (
      <Styled.Dialog open={isOpen}>
        <Styled.Backdrop open={isOpen} />
        <Styled.Content aria-modal={isOpen} ref={modalRef}>
          {/* {isOpen && <ExpandContract isOpen={isOpen} onToggle={closeModal} />} */}
          <WrappedComponent {...{ ...props, isOpen, openModal, closeModal }} />
        </Styled.Content>
      </Styled.Dialog>
    );
  };

  WithModal.displayName = `withModal(${getDisplayName(WrappedComponent)})`;

  return WithModal;
}

export default withModal;
