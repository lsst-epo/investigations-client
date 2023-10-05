import { useContext } from "react";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "@/lib/i18n/client";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ProgressContext from "@/contexts/Progress";
import QuestionFactory from "@/components/factories/QuestionFactory";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment QuestionsBlock on contentBlocks_questionBlock_BlockType {
    id
    questionEntries {
      __typename
      id
      ...QuestionFactory
    }
  }
`);

export default function QuestionsContentBlock(props: {
  data: FragmentType<typeof Fragment>;
  interaction?: boolean;
}) {
  const isInteraction = props.interaction ?? false;
  const data = useFragment(Fragment, props.data);

  const { i18n, t } = useTranslation();
  const { questions } = useContext(ProgressContext);

  return (
    <I18nextProvider i18n={i18n}>
      <section className="content-block">
        <Styled.Heading>{t("page.questions")}</Styled.Heading>
        <Styled.QuestionList
          style={{
            "--list-background-color": isInteraction && "#E6FFE6",
            "--list-padding": isInteraction && "var(--PADDING_SMALL, 20px)",
          }}
        >
          {!!data.questionEntries?.length &&
            data.questionEntries.map((question) => {
              const { id } = question;
              const questionIndex = questions.indexOf(id);

              return question?.__typename === "questions_default_Entry" ? (
                <QuestionFactory
                  key={question.id}
                  data={question}
                  config={{ number: questionIndex + 1}}
                />
              ) : null;
            })}
        </Styled.QuestionList>
      </section>
    </I18nextProvider>
  );
}

QuestionsContentBlock.displayName = "ContentBlock.Questions";
