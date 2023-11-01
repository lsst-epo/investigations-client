"use client";
import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import BaseModal from "../Base";
import ModalHeader from "../Header";
import * as Styled from "../styles";

interface RoutedModalProps {
  title?: string;
}

/**
 * This modal differs from others that it uses the app router
 * to close the modal. It should be used as a child of server
 * components that open an intercepted route in a modal.
 *
 * This modal is always open because it lives at a dedicated
 * route and is not controlled by app state.
 */
const RoutedModal: FunctionComponent<PropsWithChildren<RoutedModalProps>> = ({
  title,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const titleId = "referenceModalTitle";
  const contentId = "referenceModalContent";

  return (
    <BaseModal ref={modalRef} closeModal={onDismiss} isOpen>
      <div
        role="dialog"
        aria-modal={true}
        aria-labelledby={title ? titleId : undefined}
        id={contentId}
      >
        <ModalHeader
          isOpen
          closeModal={onDismiss}
          {...{ title, titleId, contentId }}
        />
        <Styled.ComponentWrapper>{children}</Styled.ComponentWrapper>
      </div>
    </BaseModal>
  );
};

RoutedModal.displayName = "Layout.RoutedModal";

export default RoutedModal;
