"server-only";

import { cache } from "react";
import { cookies, headers } from "next/headers";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import { loadResources } from "./index";
import { cookieName, fallbackLng, getOptions } from "./settings";

const initI18next = async (lng: string, ns: string | string[]) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(loadResources)
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export const getLocale = cache(() => {
  return (
    headers().get("x-next-i18n-router-locale") ||
    cookies().get(cookieName)?.value ||
    fallbackLng
  );
});

async function useTranslation(
  lng?: string,
  ns: string | string[] = "translation",
  options: any = {}
) {
  const locale = lng || getLocale();
  const i18nextInstance = await initI18next(locale, ns);

  return {
    t: i18nextInstance.getFixedT(
      locale,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}

export { useTranslation, useTranslation as serverTranslation };
