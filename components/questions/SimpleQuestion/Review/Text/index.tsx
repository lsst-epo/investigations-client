"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

interface SimpleTextProps {
  value?: string;
  className?: string;
}

const SimpleText: FunctionComponent<SimpleTextProps> = ({
  value,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <Styled.TextReview className={className}>
      {value || t("review.no_answer")}
    </Styled.TextReview>
  );
};

SimpleText.displayName = "Review.Simple.Text";

export default SimpleText;
