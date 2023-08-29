import { ComponentType, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql";
import InlineQuestion from "@/components/questions/InlineQuestion";
import SimpleQuestion from "@/components/questions/SimpleQuestion";
import TabularQuestion from "@/components/questions/TabularQuestion";

export interface QuestionProps {
  data: FragmentType<typeof Fragment>;
  config?: any;
}

const QUESTION_MAP: Record<string, ComponentType<any>> = {
  simple: SimpleQuestion,
  inline: InlineQuestion,
  tabular: TabularQuestion,
};

const QuestionFactory: FunctionComponent<QuestionProps> = (props) => {
  const data = useFragment(Fragment, props.data);

  if (
    !data.id ||
    (data?.answerType !== "text" && data?.answerType !== "select")
  )
    return null;

  return (
    <SimpleQuestion
      {...props.config}
      type={data.answerType}
      questionText={data.questionText}
      options={data.answerOptions}
    />
  );

  // const Question = QUESTION_MAP[data.answerType];

  // if (!Question) return null;

  // return <Question data={data} {...{ ...props.config, id: data.id }} />;
};

QuestionFactory.displayName = "Factory.Question";

export default QuestionFactory;

const Fragment = graphql(`
  fragment QuestionFactory on questions_default_Entry {
    answerType
    answerOptions {
      ... on answerOptions_option_BlockType {
        label: optionLabel
        value: optionValue
      }
    }
    id
    questionText
  }
`);
