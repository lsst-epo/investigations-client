import { ComponentType, useState, useRef, FunctionComponent } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { useUID } from "react-uid";
import screenfull from "screenfull";
import { getDisplayName } from "@/lib/utils";
import * as Modal from "@/layout/Modal";

/** withModal is intended to wrap on-page content that will be
 * pulled out and shown in a modal, rather than off-page content
 * that is not visible until opened.
 */
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
      <Modal.Base
        isOpen={isOpen}
        ref={modalRef}
        id={contentId}
        labelledById={titleId}
        closeModal={closeModal}
      >
        {isOpen && (
          <Modal.Header
            {...{ title, isOpen, closeModal, titleId, contentId }}
          />
        )}
        <Modal.ComponentContainer>
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
        </Modal.ComponentContainer>
      </Modal.Base>
    );
  };

  WithModal.displayName = `withModal(${getDisplayName(WrappedComponent)})`;

  return WithModal;
}

export default withModal;
