"server-only";
import { FunctionComponent, use } from "react";
import { useTranslation } from "@/lib/i18n/server";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
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
> = ({ isInteraction = false, locale, ...props }) => {
  const data = useFragment(Fragment, props.data);

  const { t } = use(useTranslation(locale, "translation"));

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
