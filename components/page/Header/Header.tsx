"use client";

import { FunctionComponent, useState, useRef, SetStateAction } from "react";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { useTranslation } from "react-i18next";
import useNavHider from "@/hooks/useNavHider";
import usePages from "@/contexts/Pages";
import HeaderProgress from "@/components/page/HeaderProgress";
import Menu from "@/components/page/Menu";
import TableOfContents from "@/components/page/TableOfContents";
import useProgress from "@/contexts/Progress";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import * as Styled from "./styles";
import {
  Header as BaseHeader,
  BottomRow,
  MenuToggle,
  TopRow,
} from "@/components/layout/Header";

const Header: FunctionComponent<{
  user?: ReturnType<typeof getUserFromJwt>;
}> = ({ user }) => {
  const { t } = useTranslation();
  const { sections } = usePages();
  const { currentPageNumber } = useProgress();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mainMenuIsOpen, setMainMenuIsOpen] = useState(false);
  const [tocIsOpen, setTocIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const tocButtonRef = useRef<HTMLButtonElement>(null);

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
      <BaseHeader aria-hidden={!visible && !mainMenuIsOpen && !tocIsOpen}>
        <TopRow>
          <MenuToggle
            ref={menuButtonRef}
            onClick={() => setMainMenuIsOpen(true)}
          />
          <Styled.TocToggle
            ref={tocButtonRef}
            aria-controls="tableOfContents"
            aria-haspopup="dialog"
            onClick={() => setTocIsOpen(true)}
          >
            {t("translation:menu.table_of_contents")}
            <Styled.PageContainer>
              <IconComposer icon="DocInverted" />
              <Styled.PageNumber>{currentPageNumber}</Styled.PageNumber>
            </Styled.PageContainer>
          </Styled.TocToggle>
        </TopRow>
        {!!sections.length && (
          <BottomRow>
            <HeaderProgress />
          </BottomRow>
        )}
      </BaseHeader>
      <Menu
        isLoggedIn={!!user}
        isOpen={mainMenuIsOpen}
        onCloseCallback={() =>
          handleClose(menuButtonRef.current, setMainMenuIsOpen)
        }
        userGroup={user?.group}
      />
      <TableOfContents
        isOpen={tocIsOpen}
        onCloseCallback={() => handleClose(tocButtonRef.current, setTocIsOpen)}
        enableAll={user?.group === "educators"}
      />
    </>
  );
};

Header.displayName = "Global.Header";

export default Header;
