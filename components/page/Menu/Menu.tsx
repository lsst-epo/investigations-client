import { FunctionComponent, useState } from "react";
import {
  SlideoutMenu,
  MenuGroup,
  MenuItem,
} from "@rubin-epo/epo-react-lib/SlideoutMenu";
import Language from "./submenu/Language";
import { useGlobalData } from "@/hooks";
import usePages from "@/contexts/Pages";
import { useTranslation } from "react-i18next";
import Acknowledgements from "./submenu/Acknowledgements";
import Share from "./submenu/Share";

interface MenuProps {
  isOpen: boolean;
  onCloseCallback: () => void;
}

const Menu: FunctionComponent<MenuProps> = ({ isOpen, onCloseCallback }) => {
  const { t } = useTranslation();
  const { helpUrl } = useGlobalData("menuContent");
  const { acknowledgements = "" } = usePages();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

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
    </SlideoutMenu>
  );
};

Menu.displayName = "Global.Menu";

export default Menu;
