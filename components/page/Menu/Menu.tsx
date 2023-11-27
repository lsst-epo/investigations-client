import { FunctionComponent, useState } from "react";
import { SlideoutMenu, MenuGroup } from "@rubin-epo/epo-react-lib/SlideoutMenu";
import Language from "./submenu/Language";
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
        {acknowledgements.length > 0 && (
          <Acknowledgements
            text={acknowledgements}
            onOpenCallback={() => setIsSubMenuOpen(true)}
            onCloseCallback={() => setIsSubMenuOpen(false)}
          />
        )}
        <Share
          onOpenCallback={() => setIsSubMenuOpen(true)}
          onCloseCallback={() => setIsSubMenuOpen(false)}
        />
      </MenuGroup>
    </SlideoutMenu>
  );
};

Menu.displayName = "Global.Menu";

export default Menu;
