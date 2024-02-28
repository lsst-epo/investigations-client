"use client";
import { ComponentType, useState, useRef, FunctionComponent } from "react";
import ModalProps from "@/components/shapes/modal";
import { useUID } from "react-uid";
import screenfull from "screenfull";
import { getDisplayName } from "@/lib/utils";
import * as Modal from "@/layout/Modal";

/** withModal is intended to wrap on-page content that will be
 * pulled out and shown in a modal, rather than off-page content
 * that is not visible until opened.
 */
function withModal<T extends ModalProps>(
  WrappedComponent: ComponentType<T>
): FunctionComponent<T> {
  const WithModal = (props: T) => {
    const { hasModal = true } = props;

    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    const uid = useUID();

    // escape for content that is already within a modal (reference pages)
    if (!hasModal) {
      return <WrappedComponent {...{ ...props }} />;
    }

    const fullscreenListener = () => {
      if (!screenfull.isFullscreen) {
        setIsOpen(false);
      }
    };

    const openModal = () => {
      if (screenfull.isEnabled && modalRef.current) {
        screenfull
          .request(modalRef.current, { navigationUI: "hide" })
          .then(() => {
            screenfull.on("change", fullscreenListener);
            setIsOpen(true);
          });
      } else {
        setIsOpen(true);
      }
    };

    const closeModal = () => {
      screenfull.off("change", fullscreenListener);
      if (screenfull.isFullscreen && modalRef.current) {
        screenfull.exit().then(() => {
          setIsOpen(false);
        });
      } else {
        setIsOpen(false);
      }
    };

    const contentId = `modal-content-${uid}`;

    return (
      <Modal.Base
        isOpen={isOpen}
        ref={modalRef}
        id={contentId}
        closeModal={closeModal}
      >
        {isOpen && <Modal.Header {...{ isOpen, closeModal, contentId }} />}
        <Modal.ComponentContainer data-modal-open={isOpen}>
          <WrappedComponent
            {...{
              ...props,
              hasModal: true,
              isOpen,
              openModal,
              closeModal,
            }}
          />
        </Modal.ComponentContainer>
      </Modal.Base>
    );
  };

  WithModal.displayName = `withModal(${getDisplayName(WrappedComponent)})`;

  return WithModal;
}

export default withModal;
