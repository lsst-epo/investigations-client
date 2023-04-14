import { FunctionComponent, useState } from "react";
import * as Styled from "./styles";
import { SafeContentBlockType } from "@/components/factories/SafeContentBlockFactory/SafeContentBlockFactory";
import { BaseContentBlockProps } from "@/components/shapes";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory/ContentBlockFactory";

const allowedBlocks: SafeContentBlockType[] = ["text", "image"];

interface ModalContentBlockProps extends BaseContentBlockProps {
  buttonText: string;
  childBlock: {
    type: SafeContentBlockType;
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
            <Styled.Header hasTitle={false}>
              <Styled.Close
                isOpen={isOpen}
                onToggle={() => setIsOpen(false)}
                controlsId={pageId}
              />
            </Styled.Header>
          )}
          <Styled.ComponentWrapper>
            <ContentBlockFactory
              pageId={pageId}
              data={{ ...childBlock.data, isOpen: true, hasModal: false }}
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
