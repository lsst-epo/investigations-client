import { FunctionComponent } from "react";
import * as Styled from "./styles";

interface ModalHeaderProps {
  title?: string;
  isOpen?: boolean;
  titleId?: string;
  contentId: string;
  closeModal: () => void;
}

const ModalHeader: FunctionComponent<ModalHeaderProps> = ({
  title,
  isOpen,
  titleId,
  contentId,
  closeModal,
}) => {
  return (
    <Styled.Header
      style={{
        "--header-background-color": title
          ? "var(--turquoise85, #12726c)"
          : undefined,
      }}
    >
      {title && <Styled.Title id={titleId}>{title}</Styled.Title>}
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
