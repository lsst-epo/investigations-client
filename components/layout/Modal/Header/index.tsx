import { FunctionComponent } from "react";
import * as Styled from "./styles";

interface ModalHeaderProps {
  isOpen?: boolean;
  contentId: string;
  closeModal: () => void;
}

const ModalHeader: FunctionComponent<ModalHeaderProps> = ({
  isOpen,
  contentId,
  closeModal,
}) => {
  return (
    <Styled.Header>
      <Styled.Close
        isOpen={isOpen}
        onToggle={closeModal}
        controlsId={contentId}
      />
    </Styled.Header>
  );
};

ModalHeader.displayName = "Layout.Modal.Header";

export default ModalHeader;
