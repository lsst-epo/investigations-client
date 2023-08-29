import { I18nextProvider } from "react-i18next";
import { useTranslation } from "@/lib/i18n/client";
import { graphql, useFragment, FragmentType } from "@/gql";
import QuestionFactory from "@/components/factories/QuestionFactory";
import * as Styled from "./styles";

export default function QuestionsContentBlock(props: {
  data: FragmentType<typeof Fragment>;
  interaction?: boolean;
}) {
  const isInteraction = props.interaction ?? false;
  const data = useFragment(Fragment, props.data);

  const { i18n } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <Styled.QuestionList
        style={{
          "--list-background-color": isInteraction && "#E6FFE6",
          "--list-padding": isInteraction && "var(--PADDING_SMALL, 20px)",
        }}
      >
        {!!data.questionEntries?.length &&
          data.questionEntries.map((question) =>
            question?.__typename === "questions_default_Entry" ? (
              <QuestionFactory key={question.id} data={question} />
            ) : null
          )}
      </Styled.QuestionList>
    </I18nextProvider>
  );
}

QuestionsContentBlock.displayName = "ContentBlock.Questions";

const Fragment = graphql(`
  fragment QuestionsBlock on contentBlocks_questionBlock_BlockType {
    questionEntries {
      __typename
      id
      ...QuestionFactory
    }
  }
`);
