import { FunctionComponent, useState } from "react";
import {
  SlideoutMenu,
  MenuGroup,
  MenuItem,
} from "@rubin-epo/epo-react-lib/SlideoutMenu";
import { useTranslation } from "react-i18next";
import { useAuthDialogManager } from "@/contexts/AuthDialogManager";
import signOut from "@/lib/auth/actions/signOut";

interface MenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onCloseCallback: () => void;
  investigationEntry?: {
    title?: string | null;
    uri?: string | null;
  } | null;
}

const Menu: FunctionComponent<MenuProps> = ({
  isOpen,
  isLoggedIn,
  onCloseCallback,
  investigationEntry,
}) => {
  const { t } = useTranslation("translation");
  const { openModal } = useAuthDialogManager();
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
      <MenuGroup title={t("menu.quick_access")}>
        {investigationEntry?.uri && (
          <MenuItem
            icon="Backward"
            type="link"
            text={t("assessment.back_to_name", {
              name: investigationEntry.title,
            })}
            href={`/${investigationEntry.uri}`}
          />
        )}
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
