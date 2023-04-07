import { useState, useRef } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useGlobalData from "@/hooks/useGlobalData";
import * as Styled from "./styles";
import { isCraftHome } from "@/helpers";

export default function LanguageSelect({ id }: { id: string }) {
  // the locale from the router is considered the true locale
  const { locale, defaultLocale = "en", push, asPath } = useRouter();
  const { t, i18n } = useTranslation();
  const {
    localeInfo: { localized },
  } = useGlobalData();
  const isDefaultLang = locale === defaultLocale;
  const [loading, setLoading] = useState(false);

  // hold the current locale in the state, we can use this to determine
  // when the locale has changed by comparing to the current locale from the
  // router.
  const [prevLocale, setPrevLocale] = useState(locale);
  const switchCount = useRef(0);

  // if the router's locale does not match our stored locale, then a locale
  // change has occurred and we need to update the stored locale and end
  // any loading.
  if (locale !== prevLocale) {
    setLoading(false);
    setPrevLocale(locale);
  }

  const handleClick = () => {
    switchCount.current++;

    if (switchCount.current > 0) {
      /** if you have more than two languages you'll want to make this
       * more dynamic, but with just English and Spanish we know that
       * the if the current locale is the default then the new locale
       * will be Spanish
       **/
      const newLang = isDefaultLang ? "es" : defaultLocale;

      /**
       * CraftCMS returns an array of localized URI's that can be searched
       * to find the URI of this page in it's new locale. This is useful if
       * you want to localize the URI's themselves.
       */
      const newRoute = localized.find((l) => l.language.includes(newLang));

      if (newRoute) {
        const { uri } = newRoute;

        /**
         * CraftCMS uses a special URI for the homepage that the Next.js router
         * will not navigate to correctly, so in that case we want to use the
         * existing asPath which is the final URI of the homepage.
         */
        const path = isCraftHome(uri) ? asPath : uri;
        i18n.changeLanguage(newLang, () => {
          const cookies = new Cookies();
          // set a cookie that Next.js will use the next time the user visits
          cookies.set("NEXT_LOCALE", newLang, {
            path: "/",
            maxAge: 100 * 24 * 60 * 60,
          });
          push(path, path, { locale: newLang });
        });

        setLoading(true);
      }
    }
  };

  return (
    <Styled.Fieldset>
      <legend className="a-hidden">{t("localize-content")}</legend>
      <Styled.Label htmlFor={id} $disabled={loading}>
        <Styled.MobileLabelText role="presentation">
          {t("language-select-label")}
        </Styled.MobileLabelText>
        <span className="a-hidden">{t("espanol-site-name")}</span>
        <Styled.Switch
          id={id}
          checked={!isDefaultLang}
          aria-disabled={loading}
          onClick={handleClick}
        />
      </Styled.Label>
    </Styled.Fieldset>
  );
}

LanguageSelect.displayName = "Global.LanguageSelect";
