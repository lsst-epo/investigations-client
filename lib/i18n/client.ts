"use client";

import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { fallbackLng, defaultNS, getOptions } from "./settings";
import { loadResources } from "./index";

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(loadResources)
  .init({
    ...getOptions(),
    ns: ["translation", "epo-react-lib", "epo-widget-lib"],
    fallbackNS: ["translation", "epo-react-lib", "epo-widget-lib"],
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
  });

export function useTranslation(
  lng: string = fallbackLng,
  ns: string = defaultNS,
  options?: any
) {
  if (i18next.resolvedLanguage !== lng) i18next.changeLanguage(lng);
  return useTranslationOrg(ns, options);
}
