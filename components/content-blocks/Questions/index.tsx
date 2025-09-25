"server-only";
import { FunctionComponent } from "react";
import { serverTranslation } from "@/lib/i18n/server";
import { graphql, useFragment as getFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import QuestionFactory from "@/components/factories/QuestionFactory";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment QuestionsBlock on contentBlocks_questionBlock_BlockType {
    __typename
    id
    questionEntries {
      ...QuestionEntry
    }
  }
`);

const QuestionsContentBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = async ({ isInteraction = false, locale, ...props }) => {
  const data = getFragment(Fragment, props.data);
  const { t } = await serverTranslation(locale, "translation");

  return (
    <section className="content-block">
      {!isInteraction && <Styled.Heading>{t("page.questions")}</Styled.Heading>}
      <Styled.QuestionList
        style={{
          "--list-background-color": isInteraction && "#E6FFE6",
        }}
      >
        {!!data.questionEntries?.length &&
          data.questionEntries.map((question, i) => {
            return question?.__typename === "questions_default_Entry" ? (
              <QuestionFactory key={i} data={question} locale={locale} />
            ) : null;
          })}
      </Styled.QuestionList>
    </section>
  );
};

QuestionsContentBlock.displayName = "ContentBlock.Questions";

export default QuestionsContentBlock;
