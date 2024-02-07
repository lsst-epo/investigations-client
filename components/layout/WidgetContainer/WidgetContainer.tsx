import { FunctionComponent, PropsWithChildren } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import ExpandContract from "@/atomic/ExpandContract";
import Instructions from "./Instructions";
import * as Styled from "./styles";

interface WidgetContainerProps
  extends Omit<BaseContentBlockProps, "data" | "locale" | "site"> {
  caption?: string;
  instructions?: string;
  variant?: "dark" | "light";
  /** for widgets that are not intended to be interactive when unopened, or totally static */
  interactive?: boolean;
  fillScreen?: boolean;
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
  paddingSize = "small",
  variant = "dark",
  fillScreen = false,
  interactive = true,
  className,
  style,
}) => {
  return (
    <Styled.WidgetContainer
      data-modal-open={isOpen}
      data-theme={variant}
      data-interactive={interactive}
      data-fill-screen={fillScreen}
      className={className}
      style={{
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
        {isOpen && instructions && <Instructions text={instructions} />}
      </Styled.WidgetContent>
    </Styled.WidgetContainer>
  );
};

WidgetContainer.displayName = "Layout.WidgetContainer";

export default WidgetContainer;
