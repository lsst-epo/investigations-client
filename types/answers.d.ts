import { AnswerInterface } from "@/gql/student-schema/graphql";

type QuestionId = string;

export type InvestigationId = string | null | undefined;

export type Answers = {
  [key: QuestionId]: AnswerInterface;
};
