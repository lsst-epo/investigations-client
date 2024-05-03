import { FunctionComponent, PropsWithChildren, ReactNode } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import ExpandContract from "@/atomic/ExpandContract";
import Instructions from "./InteractionText";
import * as Styled from "./styles";

interface WidgetContainerProps
  extends Omit<BaseContentBlockProps, "data" | "locale" | "site"> {
  title?: string;
  caption?: ReactNode;
  instructions?: string;
  className?: string;
}

const WidgetContainer: FunctionComponent<
  PropsWithChildren<WidgetContainerProps>
> = ({
  title,
  caption,
  instructions,
  children,
  hasModal = true,
  isOpen = false,
  openModal,
  className,
}) => {
  return (
    <Styled.WidgetBlock data-modal-open={isOpen} {...{ className }}>
      <Styled.WidgetContainer>
        {hasModal && !isOpen && (
          <Styled.WidgetHeader>
            <Styled.WidgetTitle>{title}</Styled.WidgetTitle>
            <ExpandContract
              onToggle={() => openModal && openModal()}
              isOpen={isOpen}
            />
          </Styled.WidgetHeader>
        )}
        <Styled.WidgetBody>
          <Styled.WidgetRow>{children}</Styled.WidgetRow>
          {caption && <Styled.WidgetCaption>{caption}</Styled.WidgetCaption>}
          {isOpen && instructions && <Instructions text={instructions} />}
        </Styled.WidgetBody>
      </Styled.WidgetContainer>
    </Styled.WidgetBlock>
  );
};

WidgetContainer.displayName = "Layout.WidgetContainer";

export default WidgetContainer;
