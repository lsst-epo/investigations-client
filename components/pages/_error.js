import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGlobalData } from "@/lib/api/global";
import { updateI18n } from "@/lib/i18n";
import { GlobalDataProvider } from "@/contexts/GlobalData";
import ErrorPageTemplate from "@/components/templates/ErrorPage";
import { useTranslation } from "react-i18next";

export default function Error({ statusCode }) {
  const { data, isLoading, isError } = useGlobalData();
  let globalData = {};
  const [lang, setLang] = useState("en");
  const [error, setError] = useState("page-not-found");
  updateI18n(lang);
  const { t } = useTranslation();
  const errorData = {
    title: t(`${error}-title`),
    text: t(`${error}-text`),
  };

  useEffect(() => {
    if (window.location.pathname.startsWith("/es")) {
      setLang("es");
    }
    if (statusCode && statusCode !== 404) {
      setError("error");
    }
  }, [setError, setLang, statusCode]);

  if (data) {
    const globals = data[`globals${lang === "es" ? "_es" : ""}`].reduce(
      (obj, item) =>
        Object.assign(obj, Object.keys(item).length && { [item.handle]: item }),
      {}
    );
    globalData = {
      headerNavItems: data[`pageTree${lang === "es" ? "_es" : ""}`],
      siteInfo: globals.siteInfo,
      localeInfo: {
        locale: lang,
      },
    };
  }

  if (isLoading || isError) {
    return null;
  }

  return (
    <GlobalDataProvider data={globalData}>
      <ErrorPageTemplate data={errorData}></ErrorPageTemplate>
    </GlobalDataProvider>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number,
};
