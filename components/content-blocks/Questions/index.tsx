import { FunctionComponent } from "react";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "@/lib/i18n/client";
import QuestionFactory, {
  QuestionProps,
} from "@/components/factories/QuestionFactory";
import * as Styled from "./styles";

interface QuestionsContentBlockProps {
  questions: QuestionProps[];
  interaction?: boolean;
}

const QuestionsContentBlock: FunctionComponent<QuestionsContentBlockProps> = ({
  questions = [],
  interaction: isInteraction = false,
}) => {
  const { i18n } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <Styled.QuestionList
        style={{
          "--list-background-color": isInteraction && "#E6FFE6",
          "--list-padding": isInteraction && "var(--PADDING_SMALL, 20px)",
        }}
      >
        {questions.map((question) => (
          <QuestionFactory key={question.id} {...question} />
        ))}
      </Styled.QuestionList>
    </I18nextProvider>
  );
};

QuestionsContentBlock.displayName = "ContentBlock.Questions";

export default QuestionsContentBlock;
