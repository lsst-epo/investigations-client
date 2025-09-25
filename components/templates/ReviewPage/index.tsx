import { FunctionComponent, use } from "react";
import { fallbackLng } from "@/lib/i18n/settings";
import { useTranslation } from "@/lib/i18n/server";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import ReviewList from "@/components/review/ReviewList";
import ReviewExport from "@/components/review/Export";
import { Question } from "@/helpers/questions";
import * as Styled from "./styles";

const ReviewPage: FunctionComponent<{
  investigation?: string;
  user?: ReturnType<typeof getUserFromJwt>;
  locale: string;
  questions: Array<Question>;
}> = ({ user, locale = fallbackLng, investigation, questions }) => {
  const { t } = use(useTranslation(locale, "translation"));
  const submissionDate = new Date();

  return (
    <Styled.PageContainer width="regular">
      <h1>{t("review.title", { investigation })}</h1>
      <ReviewExport {...{ user, questions, investigation }}>
        <div>
          <Styled.ReviewLabel as="span">{t("review.date")}</Styled.ReviewLabel>
          <time dateTime={submissionDate.toISOString()}>
            {submissionDate.toLocaleDateString(locale, {
              year: "numeric",
              day: "numeric",
              month: "long",
            })}
          </time>
        </div>
        <ReviewList {...{ questions }} />
      </ReviewExport>
    </Styled.PageContainer>
  );
};

ReviewPage.displayName = "Template.Review";

export default ReviewPage;
