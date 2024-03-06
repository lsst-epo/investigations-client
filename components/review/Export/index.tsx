"use client";
import {
  ChangeEvent,
  FunctionComponent,
  PropsWithChildren,
  useState,
  useContext,
} from "react";
import { useTranslation } from "react-i18next";
import FormButtons from "@rubin-epo/epo-react-lib/FormButtons";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import PrintButton from "@/components/review/PrintButton";
import XlsxButton from "@/components/review/XlsxButton";
import * as Styled from "./styles";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import { Question } from "@/helpers/questions";

interface ReviewExportProps {
  user: ReturnType<typeof getUserFromJwt>;
  investigation?: string;
  questions: Array<Question>;
}

const ReviewExport: FunctionComponent<PropsWithChildren<ReviewExportProps>> = ({
  user,
  investigation,
  children,
  questions,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState(user?.fullName);
  const { answers } = useContext(StoredAnswersContext);

  const nameInputId = "name";

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <>
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

      {children}
      <FormButtons>
        <PrintButton filename={name}>{t("review.print")}</PrintButton>
        <XlsxButton {...{ answers, questions, investigation, name }}>
          {t("review.export")}
        </XlsxButton>
      </FormButtons>
    </>
  );
};

export default ReviewExport;
