import { ComponentType, useState, useRef, FunctionComponent } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { useUID } from "react-uid";
import screenfull from "screenfull";
import { getDisplayName } from "@/lib/utils";
import BaseModal from "@/components/layout/Modal/Base";
import ModalHeader from "@/components/layout/Modal/Header";
import * as Styled from "./styles";

function withModal<T extends BaseContentBlockProps>(
  WrappedComponent: ComponentType<T>
): FunctionComponent<T> {
  const WithModal = (props: T) => {
    const { title, hasModal = true } = props;

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

    const titleId = `modal-title-${uid}`;
    const contentId = `modal-content-${uid}`;

    return (
      <BaseModal isOpen={isOpen} ref={modalRef} closeModal={closeModal}>
        <div
          role={isOpen ? "dialog" : "generic"}
          aria-modal={isOpen}
          aria-labelledby={title ? titleId : undefined}
          id={contentId}
        >
          {isOpen && (
            <ModalHeader
              {...{ title, isOpen, closeModal, titleId, contentId }}
            />
          )}
          <Styled.Modal.ComponentWrapper>
            <WrappedComponent
              {...{
                ...props,
                hasModal: true,
                isOpen,
                openModal,
                closeModal,
                labelledById: title && isOpen ? titleId : undefined,
              }}
            />
          </Styled.Modal.ComponentWrapper>
        </div>
      </BaseModal>
    );
  };

  WithModal.displayName = `withModal(${getDisplayName(WrappedComponent)})`;

  return WithModal;
}

export default withModal;
