import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { loadResources } from "../lib/i18n";
import LanguageDetector from "i18next-browser-languagedetector";

const supportedLngs = ["en", "es"];

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(loadResources)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs,
  });

export default i18n;
