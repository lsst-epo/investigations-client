import Button from "@rubin-epo/epo-react-lib/Button";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";

export default function MenuToggle(props: React.ComponentProps<typeof Button>) {
  const { t } = useTranslation();

  return (
    <Styled.MenuToggle
      aria-controls="mainMenu"
      aria-haspopup="menu"
      icon="Hamburger"
      iconSize={20}
      aria-label={t("translation:menu.toggle")}
      {...props}
    />
  );
}
