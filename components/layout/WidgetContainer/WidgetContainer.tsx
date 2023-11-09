import { FunctionComponent, PropsWithChildren } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import ExpandContract from "@/atomic/ExpandContract";
import * as Styled from "./styles";

interface WidgetContainerProps extends BaseContentBlockProps {
  caption?: string;
  bgColor?: "white" | "gray";
  paddingSize?: "large" | "medium" | "small" | "none";
  className?: string;
  style?: any;
}

const padding = {
  none: "0",
  small: "var(--PADDING_SMALL, 20px)",
  medium: "var(--PADDING_MEDIUM, 40px)",
  large: "var(--PADDING_LARGE, 100px)",
};

const backgrounds = {
  white: "var(--white, #fff)",
  gray: "var(--neutral10, #F5F5F5)",
};

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
  className,
  style,
}) => {
  return (
    <Styled.WidgetContainer
      data-modal-open={isOpen}
      className={className}
      style={{
        "--widget-background-color": backgrounds[bgColor],
        "--widget-container-padding": isOpen
          ? 0
          : `calc(${padding[paddingSize]} / 2)`,
        ...style,
      }}
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
        {caption && <Styled.WidgetCaption>{caption}</Styled.WidgetCaption>}
      </Styled.WidgetContent>
    </Styled.WidgetContainer>
  );
};

WidgetContainer.displayName = "Layout.WidgetContainer";

export default WidgetContainer;
