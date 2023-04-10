import { ComponentType, useState, useRef } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { useUID } from "react-uid";
import screenfull from "screenfull";
import useFocusTrap from "@/hooks/useFocusTrap";
import { useKeyDownEvent } from "@/hooks/listeners";
import { getDisplayName } from "@/lib/utils";
import * as Styled from "./styles";
export interface ModalInnerProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

function withModal<T extends BaseContentBlockProps>(
  WrappedComponent: ComponentType<T & ModalInnerProps>
) {
  const WithModal = (props: T) => {
    const { title } = props;
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const openModal = () => {
      if (screenfull.isEnabled && modalRef.current) {
        screenfull
          .request(modalRef.current, { navigationUI: "hide" })
          .then(() => {
            setIsOpen(true);
          });
      } else {
        setIsOpen(true);
      }
    };

    const closeModal = () => {
      if (screenfull.isFullscreen && modalRef.current) {
        screenfull.exit().then(() => {
          setIsOpen(false);
        });
      } else {
        setIsOpen(false);
      }
    };

    const uid = useUID();
    const titleId = `modal-title-${uid}`;
    const contentId = `modal-content-${uid}`;

    const handleKeyDown = ({ key }: { key: string }) => {
      if (!isOpen) return;
      if (key === "Escape") {
        closeModal();
      }
    };

    useFocusTrap(modalRef, isOpen);
    useKeyDownEvent(handleKeyDown);

    return (
      <Styled.Dialog open={isOpen} ref={modalRef}>
        <Styled.Backdrop open={isOpen} />
        <div
          role={isOpen ? "dialog" : "generic"}
          aria-modal={isOpen}
          aria-labelledby={title ? titleId : undefined}
          id={contentId}
        >
          {isOpen && (
            <Styled.Header hasTitle={!!title}>
              {title && <Styled.Title id={titleId}>{title}</Styled.Title>}
              <Styled.Close
                isOpen={isOpen}
                onToggle={closeModal}
                controlsId={contentId}
              />
            </Styled.Header>
          )}
          <Styled.ComponentWrapper>
            <WrappedComponent
              {...{
                ...props,
                isOpen,
                openModal,
                closeModal,
                labelledById: title && isOpen ? titleId : undefined,
              }}
            />
          </Styled.ComponentWrapper>
        </div>
      </Styled.Dialog>
    );
  };

  WithModal.displayName = `withModal(${getDisplayName(WrappedComponent)})`;

  return WithModal;
}

export default withModal;
