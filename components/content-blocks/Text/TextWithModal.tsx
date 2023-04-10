import { Container } from "@rubin-epo/epo-react-lib";
import withModal, {
  ModalInnerProps,
} from "@/components/hoc/withModal/withModal";
import ExpandContract from "@/atomic/ExpandContract/ExpandContract";
import { FunctionComponent } from "react";

const TextContentBlock: FunctionComponent<
  { text: string } & ModalInnerProps
> = ({ text, isOpen, openModal, closeModal }) => {
  return (
    <Container paddingSize={isOpen ? "none" : "medium"}>
      <ExpandContract
        onToggle={() => (isOpen ? closeModal() : openModal())}
        isOpen={isOpen}
      />
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        className="c-content-rte"
      />
    </Container>
  );
};

TextContentBlock.displayName = "ContentBlock.Text";

export default withModal(TextContentBlock);
