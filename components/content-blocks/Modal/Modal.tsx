import { FunctionComponent, useState } from "react";
import * as Styled from "./styles";
import { BaseContentBlockProps } from "@/components/shapes";
import SimpleContentBlockFactory, {
  SimpleContentBlockType,
} from "@/components/factories/SimpleContentBlockFactory";

const allowedBlocks: SimpleContentBlockType[] = ["text", "image"];

interface ModalContentBlockProps extends BaseContentBlockProps {
  buttonText: string;
  childBlock: {
    type: SimpleContentBlockType;
    data: any;
  };
}

const ModalContentBlock: FunctionComponent<ModalContentBlockProps> = ({
  buttonText,
  childBlock,
  pageId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasValidChild = allowedBlocks.includes(childBlock.type);

  if (!hasValidChild) return null;

  return (
    <>
      <Styled.ModalButton icon="Info" onClick={() => setIsOpen(true)} isBlock>
        {buttonText}
      </Styled.ModalButton>
      <Styled.Dialog open={isOpen}>
        <Styled.Backdrop open={isOpen} />
        <div role="dialog" aria-modal="true" id={pageId}>
          {isOpen && (
            <Styled.Header $hasTitle={false}>
              <Styled.Close
                isOpen={isOpen}
                onToggle={() => setIsOpen(false)}
                controlsId={pageId}
              />
            </Styled.Header>
          )}
          <Styled.ComponentWrapper>
            <SimpleContentBlockFactory
              pageId={pageId}
              data={childBlock.data}
              type={childBlock.type}
              isInModal={true}
            />
          </Styled.ComponentWrapper>
        </div>
      </Styled.Dialog>
    </>
  );
};

ModalContentBlock.displayName = "ContentBlock.Modal";

export default ModalContentBlock;
