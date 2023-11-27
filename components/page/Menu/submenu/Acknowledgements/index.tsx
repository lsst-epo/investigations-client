import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { SlideoutMenu, MenuItem } from "@rubin-epo/epo-react-lib/SlideoutMenu";
import * as Styled from "./styles";

const Acknowledgements: FunctionComponent<{
  onOpenCallback: () => void;
  onCloseCallback: () => void;
  text: string;
}> = ({ onOpenCallback, onCloseCallback, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const id = "acknowledgementsMenu";

  return (
    <MenuItem
      icon="Info"
      text={t("translation:acknowledgements.select_label")}
      onClick={() => setIsOpen(true)}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={id}
    >
      <SlideoutMenu
        isOpen={isOpen}
        id={id}
        title={t("translation:acknowledgements.title")}
        callToAction={t("translation:acknowledgements.subtitle")}
        onOpenCallback={() => onOpenCallback && onOpenCallback()}
        onCloseCallback={() => {
          setIsOpen(false);
          return onCloseCallback && onCloseCallback();
        }}
      >
        <Styled.MenuText
          dangerouslySetInnerHTML={{ __html: text }}
        ></Styled.MenuText>
      </SlideoutMenu>
    </MenuItem>
  );
};

Acknowledgements.displayName = "Global.Menu.Acknowledgements";

export default Acknowledgements;
