"use client";

import { FunctionComponent, useState, useRef } from "react";
import Button from "@rubin-epo/epo-react-lib/Button";
import TableOfContents from "../TableOfContents";
import Menu from "../Menu";
import HeaderProgress from "@/components/page/HeaderProgress";
import useNavHider from "@/hooks/useNavHider";
import usePages from "@/contexts/Pages";
import * as Styled from "./styles";

const Header: FunctionComponent = () => {
  const { sections } = usePages();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mainMenuIsOpen, setMainMenuIsOpen] = useState(false);
  const [tocIsOpen, setTocIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useNavHider(prevScrollPos, setPrevScrollPos, visible, setVisible);

  const handleClose = () => {
    buttonRef.current && buttonRef.current.focus();

    return setMainMenuIsOpen(false);
  };

  return (
    <Styled.Header aria-hidden={!visible && !mainMenuIsOpen && !tocIsOpen}>
      <Styled.FullWidthCol>
        <Styled.TopRow>
          <Styled.MenuToggle
            ref={buttonRef}
            aria-controls="mainMenu"
            aria-haspopup="menu"
            icon="Hamburger"
            iconSize={20}
            onClick={() => setMainMenuIsOpen(true)}
            aria-label="Toggle Main Menu"
          />
          <Button
            aria-controls="tableOfContents"
            aria-haspopup="menu"
            icon="Doc"
            iconSize={20}
            onClick={() => setTocIsOpen(true)}
          >
            <div>Table of Contents</div>
          </Button>
        </Styled.TopRow>
        {!!sections.length && (
          <Styled.BottomRow>
            <HeaderProgress />
          </Styled.BottomRow>
        )}
      </Styled.FullWidthCol>
      <Menu isOpen={mainMenuIsOpen} onCloseCallback={() => handleClose()} />
      <TableOfContents
        id="tableOfContents"
        title="Table of Contents"
        isOpen={tocIsOpen}
        onCloseCallback={() => setTocIsOpen(false)}
      />
    </Styled.Header>
  );
};

Header.displayName = "Global.Header";

export default Header;
