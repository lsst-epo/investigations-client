import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import { useOnClickOutside, useKeyDownEvent } from "@/hooks/listeners";
import * as Styled from "./styles";
import { MENU_TRANSITION_TIME } from "./constants";

interface SlideoutMenuProps {
  id: string;
  isOpen: boolean;
  onOpenCallback?: () => void;
  onCloseCallback?: () => void;
}

const SlideoutMenu: FunctionComponent<PropsWithChildren<SlideoutMenuProps>> = ({
  id,
  isOpen = false,
  onOpenCallback,
  onCloseCallback,
  children,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(!isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsHidden(false);
      onOpenCallback && onOpenCallback();
    } else {
      setTimeout(() => {
        setIsHidden(true);
      }, MENU_TRANSITION_TIME);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    if (isOpen) {
      return onCloseCallback && onCloseCallback();
    }
  };

  function handleKeyDown(event: KeyboardEvent) {
    if (isOpen) {
      const { key } = event;

      const keyMap: { [key: string]: () => void } = {
        Escape: handleClose,
      };

      const action = keyMap[key];
      if (action) {
        event.preventDefault();
        action();
      }
    }
  }

  const menuId = `slideOutMenu-${id}`;
  const menuTitleId = `slideOutMenuTitle-${id}`;

  useKeyDownEvent(handleKeyDown);
  useOnClickOutside(menuRef, handleClose);

  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <Styled.Overlay
      role="none"
      aria-hidden={!isOpen}
      style={{ "--visibility": !isHidden && "visible" }}
    >
      <Styled.MenuContainer
        ref={menuRef}
        role="menu"
        aria-labelledby={menuTitleId}
        id={menuId}
      >
        <Styled.MenuHeader>
          <Styled.MenuCloseButton
            type="button"
            onClick={() => handleClose()}
            tabIndex={-1}
          >
            <IconComposer icon="close" size={25} />
          </Styled.MenuCloseButton>
        </Styled.MenuHeader>
        {children}
      </Styled.MenuContainer>
    </Styled.Overlay>
  );
};

SlideoutMenu.displayName = "Layout.SlideoutMenu";

export default SlideoutMenu;
