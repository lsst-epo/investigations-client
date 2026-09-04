export function checkSitesForLocale(sites: (string | null)[] | null, locale: string) {
  return sites?.includes(locale) || locale === "en" && sites?.includes("en-US");
}