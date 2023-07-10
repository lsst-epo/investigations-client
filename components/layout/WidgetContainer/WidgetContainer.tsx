import { FunctionComponent, PropsWithChildren } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import ExpandContract from "@/atomic/ExpandContract";
import * as Styled from "./styles";

interface WidgetContainerProps extends BaseContentBlockProps {
  caption?: string;
  bgColor?: "white" | "gray";
  paddingSize?: "large" | "medium" | "small" | "none";
}

const WidgetContainer: FunctionComponent<
  PropsWithChildren<WidgetContainerProps>
> = ({
  title,
  caption,
  children,
  hasModal = true,
  isOpen = false,
  openModal,
  bgColor = "white",
  paddingSize = "small",
}) => {
  return (
    <Styled.WidgetContainer
      $bgColor={bgColor}
      $paddingSize={paddingSize}
      $isOpen={isOpen}
    >
      {hasModal && !isOpen && (
        <Styled.WidgetHeader>
          <Styled.WidgetTitle>{title}</Styled.WidgetTitle>
          <ExpandContract
            onToggle={() => openModal && openModal()}
            isOpen={isOpen}
          />
        </Styled.WidgetHeader>
      )}
      <Styled.WidgetContent>
        {children}
        {caption && (
          <Styled.WidgetCaption $isDarkMode={isOpen}>
            {caption}
          </Styled.WidgetCaption>
        )}
      </Styled.WidgetContent>
    </Styled.WidgetContainer>
  );
};

WidgetContainer.displayName = "Layout.WidgetContainer";

export default WidgetContainer;
