import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";
import {
  SlideoutMenu,
  MenuItem,
  MenuItemRadio,
} from "@rubin-epo/epo-react-lib/SlideoutMenu";
import { fallbackLng, languages, cookieName } from "@/lib/i18n/settings";
import { useCookies } from "react-cookie";

const Language: FunctionComponent<{
  onOpenCallback: () => void;
  onCloseCallback: () => void;
}> = ({ onOpenCallback, onCloseCallback }) => {
  const [cookies] = useCookies([cookieName]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const language: string = cookies[cookieName] || fallbackLng;
  const id = "languageMenu";

  const setLanguage = (newLocale: string) => {
    if (newLocale !== language) {
      const parts = pathname?.split("/") || [];
      parts.shift();

      if (language !== fallbackLng) {
        parts.shift();
      }

      const route = `/${newLocale}/${parts.join("/")}`;
      i18n.changeLanguage(newLocale);
      router.push(route);
    }
  };

  return (
    <MenuItem
      icon="Globe"
      text={t("translation:language.language_select_label")}
      onClick={() => setIsOpen(true)}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={id}
    >
      <SlideoutMenu
        isOpen={isOpen}
        id={id}
        title={t("translation:language.language_select_label")}
        callToAction={t("translation:language.language_cta")}
        onOpenCallback={() => onOpenCallback && onOpenCallback()}
        onCloseCallback={() => {
          setIsOpen(false);
          return onCloseCallback && onCloseCallback();
        }}
      >
        {languages.map((locale) => (
          <MenuItemRadio
            key={locale}
            text={t(`translation:language.locales.${locale}`)}
            isChecked={locale === language}
            onCheckCallback={(close) => {
              setLanguage(locale);

              if (close) {
                setIsOpen(false);
              }
            }}
          />
        ))}
      </SlideoutMenu>
    </MenuItem>
  );
};

Language.displayName = "Global.Menu.Language";

export default Language;
