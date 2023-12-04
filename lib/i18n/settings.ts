export const fallbackLng = "en";
export const languages = [fallbackLng, "es", "fr"];
export const defaultNS = "translation";
export const namespaces = [defaultNS, "epo-react-lib", "epo-widget-lib"];
export const cookieName = "NEXT_LOCALE";

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS
) {
  return {
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
