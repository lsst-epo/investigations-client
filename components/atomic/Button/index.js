import PropTypes from "prop-types";
import IconComposer from "@/components/svg/IconComposer";
import * as Styled from "./styles";

export default function Button({
  children,
  icon,
  iconSize,
  isBlock,
  styleAs,
  isInactive,
  className,
  ...buttonProps
}) {
  return (
    <Styled.Button
      $isBlock={isBlock}
      $styleAs={styleAs}
      $hasIcon={!!icon}
      aria-disabled={isInactive || undefined}
      className={className}
      {...buttonProps}
    >
      {icon && (
        <IconComposer
          icon={icon}
          size={iconSize}
          role={children && "presentation"}
        />
      )}
      <Styled.ButtonText>{children}</Styled.ButtonText>
    </Styled.Button>
  );
}

Button.displayName = "Atomic.Button";

Button.prototypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOf(["google", "facebook"]),
  iconSize: PropTypes.number,
  isBlock: PropTypes.bool,
  styleAs: PropTypes.oneOf(["primary", "secondary", "tertiary", "educator"]),
  /** This is a disabled style without disabling the button.
   * Good for a11y - button is visible even if form isn't complete.
   */
  isInactive: PropTypes.bool,
};
