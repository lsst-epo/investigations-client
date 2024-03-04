import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { BaseQuestionProps } from "@/types/questions";
import Table from "./Table";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment TabularQuestion on questions_default_Entry {
    id
    questionText
    ...TableRows
  }
`);

interface TabularQuestionProps extends BaseQuestionProps {
  data: FragmentType<typeof Fragment>;
  locale: string;
}

const TabularQuestion: FunctionComponent<TabularQuestionProps> = ({
  data,
  locale,
}) => {
  const { id, questionText } = useFragment(Fragment, data);

  if (!id) return null;

  return (
    <Styled.QuestionNumber {...{ id }}>
      <label htmlFor={id}>{questionText}</label>
      <Table {...{ data, locale }} />
    </Styled.QuestionNumber>
  );
};

TabularQuestion.displayName = "Questions.Tabular";

export default TabularQuestion;
