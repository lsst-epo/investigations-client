import i18n, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "@/lib/localeStrings/";

export const updateI18n = (lang: string) => {
  i18n.language !== lang && i18n.changeLanguage(lang);
};

const options: InitOptions = {
  lng: "en",
  debug: process.env.NODE_ENV === "development",
  resources,
  supportedLngs: ["en-US", "en", "es"],
  interpolation: {
    escapeValue: false,
  },
  ns: ["translation"],
  defaultNS: "translation",
  fallbackLng: { default: ["en"] },
  react: {
    transSupportBasicHtmlNodes: true,
  },
};
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init(options);
}
export default i18n;
