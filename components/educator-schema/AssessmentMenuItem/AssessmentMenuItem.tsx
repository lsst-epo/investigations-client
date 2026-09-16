"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MenuItem } from "@rubin-epo/epo-react-lib/SlideoutMenu";
import { useTranslation } from "react-i18next";
import getAssessmentUri from "./getAssessmentUri";

interface Props {
  userGroup?: string;
}

export default function AssessmentMenuItem({ userGroup }: Props) {
  const { t } = useTranslation();
  const { investigation, locale } = useParams<{
    investigation?: string;
    locale?: string;
  }>();
  const [assessmentUri, setAssessmentUri] = useState<string | null>(null);

  const isEducator = true; // userGroup === "educators";

  useEffect(() => {
    if (!isEducator || !investigation) return;

    let ignore = false;

    getAssessmentUri(investigation, locale).then((uri) => {
      if (!ignore) setAssessmentUri(uri);
    });

    return () => {
      ignore = true;
    };
  }, [isEducator, investigation, locale]);

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
