import "@/styles/styles.scss";
import globalDecorators from "./decorators";
import i18n from "./i18next.js";

const preview = {
  globals: {
    locale: "en",
    locales: {
      en: "English",
      es: "Español",
    },
  },
  parameters: {
    i18n,
  },
};
export default preview;

export const decorators = globalDecorators;
