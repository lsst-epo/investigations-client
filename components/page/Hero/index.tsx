"use client";

import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

interface HeroProps {
  heroText: string | null;
}

export default function Hero({ heroText }: HeroProps) {
  const { t } = useTranslation();
  if (!heroText) {
    heroText = t("hero.heroText");
  }
  return (
    <Styled.Hero>
      <h2>{t("hero.heading")}</h2>
      <p>{heroText}</p>
    </Styled.Hero>
  );
}
