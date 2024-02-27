"use client";
import { ChangeEvent, FunctionComponent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import FormButtons from "@rubin-epo/epo-react-lib/FormButtons";
import { fallbackLng } from "@/lib/i18n/settings";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import useQuestions from "@/contexts/Questions";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import ReviewList from "@/components/questions/ReviewList";
import PrintButton from "@/components/atomic/Button/patterns/PrintButton";
import XlsxButton from "@/components/atomic/Button/patterns/XlsxButton";
import * as Styled from "./styles";

const ReviewPage: FunctionComponent<{
  investigation?: string;
  user?: ReturnType<typeof getUserFromJwt>;
  locale: string;
}> = ({ user, locale = fallbackLng, investigation }) => {
  const { answers } = useContext(StoredAnswersContext);
  const { byAll: questions } = useQuestions();
  const [name, setName] = useState(user?.fullName);
  const { t } = useTranslation();
  const nameInputId = "name";
  const submissionDate = new Date();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Styled.PageContainer width="regular">
      <h1>{t("review.title", { investigation })}</h1>
      <div>
        <Styled.ReviewLabel htmlFor={nameInputId}>
          {t("review.name_label")}
        </Styled.ReviewLabel>
        <Styled.NameInput
          type="text"
          id={nameInputId}
          value={name}
          onChange={handleNameChange}
        />
      </div>
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
      <ReviewList {...{ answers, questions }} />
      <FormButtons>
        <PrintButton filename={name}>{t("review.print")}</PrintButton>
        <XlsxButton {...{ answers, questions, investigation, name }}>
          {t("review.export")}
        </XlsxButton>
      </FormButtons>
    </Styled.PageContainer>
  );
};

ReviewPage.displayName = "Template.Review";

export default ReviewPage;
