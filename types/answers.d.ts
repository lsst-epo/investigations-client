import { AnswerInterface } from "@/gql/graphql";

type QuestionId = string;

export type Answers = {
  [key: QuestionId]: AnswerInterface;
};
