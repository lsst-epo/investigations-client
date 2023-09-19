"use client";

import { FunctionComponent, useState, useContext } from "react";
import { SlideoutMenu } from "@rubin-epo/epo-react-lib";
// import LanguageSelect from "./LanguageSelect";
import ProgressContext from "@/contexts/Progress";
import TableOfContents from "../TableOfContents";
import HeaderProgress from "@/components/page/HeaderProgress";
import useNavHider from "@/hooks/useNavHider";
import * as Styled from "./styles";

const Header: FunctionComponent<HeaderProps> = () => {
  const { sections } = useContext(ProgressContext);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mainMenuIsOpen, setMainMenuIsOpen] = useState(false);
  const [tocIsOpen, setTocIsOpen] = useState(false);

  useNavHider(prevScrollPos, setPrevScrollPos, visible, setVisible);

  return (
    <Styled.Header
      className={`page-header ${
        visible || mainMenuIsOpen || tocIsOpen ? "visible" : "invisible"
      }`}
    >
      <Styled.FullWidthCol>
        <Styled.TopRow>
          <Styled.MainMenuToggle
            aria-controls="mainMenu"
            aria-haspopup="menu"
            icon="hamburger"
            onClick={() => setMainMenuIsOpen(true)}
          >
            <div className="a-hidden">Toggle Main Menu</div>
          </Styled.MainMenuToggle>
          <Styled.TocToggle
            aria-controls="tableOfContents"
            aria-haspopup="menu"
            icon="doc"
            onClick={() => setTocIsOpen(true)}
          >
            <div>Table of Contents</div>
          </Styled.TocToggle>
        </Styled.TopRow>
        {!!sections.length && (
          <Styled.BottomRow>
            <HeaderProgress />
          </Styled.BottomRow>
        )}
      </Styled.FullWidthCol>
      <SlideoutMenu
        id="mainMenu"
        title="Main menu"
        callToAction="Settings and more"
        isOpen={mainMenuIsOpen}
        onCloseCallback={() => setMainMenuIsOpen(false)}
      >
        <div>MAIN MENU</div>
        {/* <LanguageSelect id="langSelect" /> */}
      </SlideoutMenu>
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
