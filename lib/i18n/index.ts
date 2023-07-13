import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

export const loadResources = resourcesToBackend(
  (language: string, namespace: string, callback) => {
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
  }
);

const initI18next = async (lng: string, ns: string) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(loadResources)
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(
  lng: string,
  ns: string,
  options: any = {}
) {
  const i18nextInstance = await initI18next(lng, ns);

  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
