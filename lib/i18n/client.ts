"use client";

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { fallbackLng, defaultNS, getOptions } from "./settings";

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string, callback) => {
      switch (namespace) {
        case "epo-react-lib":
          import(
            `@rubin-epo/epo-react-lib/localeStrings/${language}/${namespace}.json`
          )
            .then(({ default: resources }) => {
              callback(null, resources);
            })
            .catch((error) => {
              callback(error, null);
            });
          break;
        case "epo-widget-lib":
          import(
            `@rubin-epo/epo-widget-lib/localeStrings/${language}/${namespace}.json`
          )
            .then(({ default: resources }) => {
              callback(null, resources);
            })
            .catch((error) => {
              callback(error, null);
            });
          break;
        default:
          import(`../../public/localeStrings/${language}/${namespace}.json`)
            .then(({ default: resources }) => {
              callback(null, resources);
            })
            .catch((error) => {
              callback(error, null);
            });
          break;
      }
    })
  )
  .init({
    ...getOptions(),
    ns: ["translation", "epo-react-lib", "epo-widget-lib"],
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

export default i18next;
