import { FunctionComponent, useState } from "react";
import {
  SlideoutMenu,
  MenuGroup,
  MenuItem,
} from "@rubin-epo/epo-react-lib/SlideoutMenu";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/hooks";
import usePages from "@/contexts/Pages";
import { signOut } from "@/components/auth/buttons/SignOut/actions";
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
  const { t } = useTranslation();
  const { helpUrl } = useGlobalData("menuContent");
  const { acknowledgements = "" } = usePages();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut("/");
  };

  return (
    <SlideoutMenu
      id="mainMenu"
      title={t("translation:menu.main")}
      callToAction={t("translation:menu.main_cta")}
      isSubMenuOpen={isSubMenuOpen}
      {...{ isOpen, onCloseCallback }}
    >
      <MenuGroup title={t("translation:menu.settings")}>
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
            text="Help"
            icon="QuestionCircle"
          />
        )}
      </MenuGroup>
      <MenuGroup title="Quick access">
        <MenuItem
          icon="CheckmarkCircle"
          type="link"
          href="./review"
          text={t("section_break.review")}
        ></MenuItem>
        {isLoggedIn && (
          <MenuItem
            icon="LogOut"
            text={t("auth.log_out")}
            onClick={handleLogout}
          ></MenuItem>
        )}
      </MenuGroup>
    </SlideoutMenu>
  );
};

Menu.displayName = "Global.Menu";

export default Menu;
