import ErrorPageTemplate from "@/components/templates/ErrorPage";
import { useTranslation } from "@/lib/i18n";
import { fallbackLng } from "@/lib/i18n/settings";

const RootNotFound = async () => {
  const { t } = await useTranslation(fallbackLng, "translation");

  const errorData = {
    title: t(`page-not-found-title`),
    text: t(`page-not-found-text`),
  };

  return <ErrorPageTemplate data={errorData} />;
};

export default RootNotFound;
