import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { BaseQuestionProps } from "@/types/questions";
import QuestionNumber from "../QuestionNumber";
import Table from "./Table";

const Fragment = graphql(`
  fragment TabularQuestion on questions_default_Entry {
    id
    questionText
    ...TableRows
  }
`);

// interface QuestionCell {
//   id: string;
//   type: TabularQuestionType;
//   value?: string;
// }
// export type TextCell = QuestionCell;
// export interface SelectCell extends QuestionCell {
//   options: Option[];
// }

interface TabularQuestionProps extends BaseQuestionProps {
  data: FragmentType<typeof Fragment>;
}

// const INPUT_MAP: Record<TabularQuestionType, ComponentType<any>> = {
//   text: Text,
//   select: Select,
// };

const TabularQuestion: FunctionComponent<TabularQuestionProps> = ({ data }) => {
  const { id, questionText } = useFragment(Fragment, data);

  if (!id) return null;

  return (
    <QuestionNumber {...{ id }}>
      <label htmlFor={id}>{questionText}</label>
      <Table {...{ data }} />
    </QuestionNumber>
  );
};

TabularQuestion.displayName = "Questions.Tabular";

export default TabularQuestion;
