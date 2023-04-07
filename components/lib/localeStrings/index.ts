import merge from "lodash/merge";
import { localeStrings } from "@rubin-epo/epo-react-lib";
import en from "./en.json";
import es from "./es.json";

export default {
  en: merge(en, localeStrings.en),
  es: merge(es, localeStrings.es),
};
