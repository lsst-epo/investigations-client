import resourcesToBackend from "i18next-resources-to-backend";

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
