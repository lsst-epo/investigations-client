import { FunctionComponent } from "react";
import { useTranslation } from "@/lib/i18n";
import { fallbackLng } from "@/lib/i18n/settings";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import ReviewList from "@/components/questions/ReviewList";
import PrintButton from "@/components/atomic/Button/patterns/PrintButton";
import * as Styled from "./styles";

const ReviewPage: FunctionComponent<{
  investigation?: string;
  user?: ReturnType<typeof getUserFromJwt>;
  locale: string;
}> = async ({ user, locale = fallbackLng, investigation }) => {
  const { t } = await useTranslation(locale, "translation");
  const nameInputId = "name";

  return (
    <Styled.PageContainer width="narrow">
      <h1>
        <Styled.DisplayTitle>{t("review.title")}</Styled.DisplayTitle>
        <Styled.PrintTitle>{investigation}</Styled.PrintTitle>
      </h1>
      <form>
        <Styled.NameLabel htmlFor={nameInputId}>
          {t("review.name_label")}
        </Styled.NameLabel>
        <Styled.NameInput type="text" id={nameInputId} value={user?.fullName} />
      </form>
      <h2>{t("review.list_title")}</h2>
      <ReviewList />
      <PrintButton text={t("review.print")} />
    </Styled.PageContainer>
  );
};

ReviewPage.displayName = "Template.Review";

export default ReviewPage;
