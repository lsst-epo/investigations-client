import styled, { css } from "styled-components";

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

export const WidgetContainer = styled.section<{
  $isOpen: boolean;
  $bgColor: "white" | "gray";
  $paddingSize: "large" | "medium" | "small" | "none";
}>`
  ${({ $bgColor, $paddingSize, $isOpen }) => css`
    --widget-header-padding: calc(var(--PADDING_SMALL, 20px) / 4);
    --widget-container-padding: ${$isOpen
      ? 0
      : css`calc(${padding[$paddingSize]} / 2)`};
    --widget-background-color: ${$isOpen
      ? "transparent"
      : backgrounds[$bgColor]};
  `}

  container-type: inline-size;
  min-width: min-content;
`;

export const WidgetHeader = styled.header`
  background-color: var(--turquoise85, #12726c);
  color: var(--white, #fff);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--widget-header-padding);
  padding-inline-start: calc(var(--widget-header-padding) * 2);
`;

export const WidgetTitle = styled.h1`
  font-size: 1rem;
`;

export const WidgetContent = styled.div`
  background-color: var(--widget-background-color);
  padding: var(--widget-container-padding);
`;

export const WidgetCaption = styled.p<{ $isDarkMode: boolean }>`
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? "var(--white,#fff)" : "inherit"};
  font-size: 0.75rem;
  margin-block-start: var(--widget-header-padding);
`;
