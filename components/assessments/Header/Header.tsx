"use client";

import { FunctionComponent, useState, useRef, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import useNavHider from "@/hooks/useNavHider";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import {
  Header as BaseHeader,
  MenuToggle,
  TopRow,
} from "@/components/layout/Header";
import Menu from "../Menu";

const Header: FunctionComponent<{
  user?: ReturnType<typeof getUserFromJwt>;
  investigationEntry?: React.ComponentProps<typeof Menu>["investigationEntry"];
}> = ({ user, investigationEntry }) => {
  const { t } = useTranslation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mainMenuIsOpen, setMainMenuIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useNavHider(prevScrollPos, setPrevScrollPos, visible, setVisible);

  const handleClose = (
    element: HTMLButtonElement | null,
    setState: (value: SetStateAction<boolean>) => void,
  ) => {
    element && element.focus();

    return setState(false);
  };

  return (
    <>
      <BaseHeader aria-hidden={!visible && !mainMenuIsOpen}>
        <TopRow>
          <MenuToggle
            ref={menuButtonRef}
            onClick={() => setMainMenuIsOpen(true)}
          />
        </TopRow>
      </BaseHeader>
      <Menu
        isLoggedIn={!!user}
        isOpen={mainMenuIsOpen}
        onCloseCallback={() =>
          handleClose(menuButtonRef.current, setMainMenuIsOpen)
        }
        investigationEntry={investigationEntry}
      />
    </>
  );
};

Header.displayName = "Global.Header";

export default Header;
