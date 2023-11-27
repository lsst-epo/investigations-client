import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { SlideoutMenu, MenuItem } from "@rubin-epo/epo-react-lib/SlideoutMenu";
import * as Styled from "./styles";

const Share: FunctionComponent<{
  onOpenCallback: () => void;
  onCloseCallback: () => void;
}> = ({ onOpenCallback, onCloseCallback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const id = "shareMenu";
  const pathname = usePathname();
  const investigation = pathname?.split("/").filter((str) => str !== "") || [];

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${investigation[0]}`;

  return (
    <MenuItem
      icon="ArrowUpFromBracket"
      text={t("translation:share.select_label")}
      onClick={() => setIsOpen(true)}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={id}
    >
      <SlideoutMenu
        isOpen={isOpen}
        id={id}
        title={t("translation:share.select_label")}
        callToAction={t("translation:share.subtitle")}
        onOpenCallback={() => onOpenCallback && onOpenCallback()}
        onCloseCallback={() => {
          setIsOpen(false);
          return onCloseCallback && onCloseCallback();
        }}
      >
        <Styled.Facebook url={url} showText />
        <Styled.Twitter url={url} showText />
        <Styled.CopyUrl url={url} showText />
        <Styled.Email url={url} showText />
      </SlideoutMenu>
    </MenuItem>
  );
};

Share.displayName = "Global.Menu.Share";

export default Share;
