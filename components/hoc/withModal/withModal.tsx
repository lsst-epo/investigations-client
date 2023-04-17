import { ComponentType, useState, useRef, FunctionComponent } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { useUID } from "react-uid";
import screenfull from "screenfull";
import useFocusTrap from "@/hooks/useFocusTrap";
import { useKeyDownEvent } from "@/hooks/listeners";
import { getDisplayName } from "@/lib/utils";
import * as Styled from "./styles";

function withModal<T extends BaseContentBlockProps>(
  WrappedComponent: ComponentType<T>
): FunctionComponent<T> {
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
      <Styled.Modal.Dialog open={isOpen} ref={modalRef}>
        <Styled.Modal.Backdrop open={isOpen} />
        <div
          role={isOpen ? "dialog" : "generic"}
          aria-modal={isOpen}
          aria-labelledby={title ? titleId : undefined}
          id={contentId}
        >
          {isOpen && (
            <Styled.Modal.Header hasTitle={!!title}>
              {title && (
                <Styled.Modal.Title id={titleId}>{title}</Styled.Modal.Title>
              )}
              <Styled.Modal.Close
                isOpen={isOpen}
                onToggle={closeModal}
                controlsId={contentId}
              />
            </Styled.Modal.Header>
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
      </Styled.Modal.Dialog>
    );
  };

  WithModal.displayName = `withModal(${getDisplayName(WrappedComponent)})`;

  return WithModal;
}

export default withModal;
