import { FunctionComponent } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { Container } from "@rubin-epo/epo-react-lib";
import withModal, {
  ModalInnerProps,
} from "@/components/hoc/withModal/withModal";
import ExpandContract from "@/atomic/ExpandContract/ExpandContract";

interface TextContentBlockProps extends BaseContentBlockProps {
  text: string;
}

const TextContentBlock: FunctionComponent<
  TextContentBlockProps & ModalInnerProps
> = ({ text, isOpen, openModal, closeModal }) => {
  return (
    <Container paddingSize={isOpen ? "none" : "medium"}>
      {!isOpen && (
        <ExpandContract
          onToggle={() => (isOpen ? closeModal() : openModal())}
          isOpen={isOpen}
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        className="c-content-rte"
      />
    </Container>
  );
};

TextContentBlock.displayName = "ContentBlock.Text";

export default withModal(TextContentBlock);
