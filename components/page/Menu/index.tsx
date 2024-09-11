import { FunctionComponent, useState } from "react";
import {
  SlideoutMenu,
  MenuGroup,
  MenuItem,
} from "@rubin-epo/epo-react-lib/SlideoutMenu";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/hooks";
import usePages from "@/contexts/Pages";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import signOut from "@/lib/auth/actions/signOut";
import Language from "./submenu/Language";
import Acknowledgements from "./submenu/Acknowledgements";
import Share from "./submenu/Share";

interface MenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onCloseCallback: () => void;
}

const Menu: FunctionComponent<MenuProps> = ({
  isOpen,
  isLoggedIn,
  onCloseCallback,
}) => {
  const { t } = useTranslation("translation");
  const { helpUrl } = useGlobalData("menuContent");
  const { openModal } = useAuthDialogManager();
  const { acknowledgements = "" } = usePages();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut("/");
  };

  return (
    <SlideoutMenu
      id="mainMenu"
      title={t("menu.main")}
      callToAction={t("menu.main_cta")}
      isSubMenuOpen={isSubMenuOpen}
      {...{ isOpen, onCloseCallback }}
    >
      <MenuGroup title={t("menu.settings")}>
        <Language
          onOpenCallback={() => setIsSubMenuOpen(true)}
          onCloseCallback={() => setIsSubMenuOpen(false)}
        />
        <Share
          onOpenCallback={() => setIsSubMenuOpen(true)}
          onCloseCallback={() => setIsSubMenuOpen(false)}
        />
        {acknowledgements && (
          <Acknowledgements
            text={acknowledgements}
            onOpenCallback={() => setIsSubMenuOpen(true)}
            onCloseCallback={() => setIsSubMenuOpen(false)}
          />
        )}
        {helpUrl && (
          <MenuItem
            type="link"
            href={helpUrl}
            target="__blank"
            text={t("menu.help")}
            icon="QuestionCircle"
          />
        )}
      </MenuGroup>
      <MenuGroup title={t("menu.quick_access")}>
        <MenuItem
          icon="CheckmarkCircle"
          type="link"
          href="./review"
          text={t("section_break.review")}
        ></MenuItem>
        {isLoggedIn ? (
          <MenuItem
            icon="LogOut"
            text={t("auth.log_out")}
            onClick={() => {
              handleLogout().finally(() => {
                localStorage.clear();
              });
            }}
          />
        ) : (
          <MenuItem
            icon="Account"
            text={t("auth.log_in")}
            onClick={() => {
              openModal("signIn");
              return onCloseCallback && onCloseCallback();
            }}
          />
        )}
      </MenuGroup>
    </SlideoutMenu>
  );
};

Menu.displayName = "Global.Menu";

export default Menu;
