"use client";

import { useEffect, useState } from "react";
import { MenuItem } from "@rubin-epo/epo-react-lib/SlideoutMenu";
import { useTranslation } from "react-i18next";
import getAssessmentUri from "./getAssessmentUri";

interface Props {
  userGroup?: string;
  investigation?: string | null;
  locale?: string;
}

export default function AssessmentMenuItem({
  userGroup,
  investigation,
  locale,
}: Props) {
  const { t } = useTranslation();
  const [assessmentUri, setAssessmentUri] = useState<string | null>(null);

  const isEducator = userGroup === "educators";

  useEffect(() => {
    if (!isEducator || !investigation || assessmentUri) return;

    let ignore = false;

    getAssessmentUri(investigation, locale).then((uri) => {
      if (!ignore) setAssessmentUri(uri);
    });

    return () => {
      ignore = true;
    };
  }, [isEducator, investigation, locale, assessmentUri]);

  if (!isEducator || !assessmentUri) return null;

  return (
    <MenuItem
      icon="CheckmarkCircle"
      type="link"
      href={`/${assessmentUri}`}
      text={t("assessment.assessment")}
    />
  );
}
