"use server";

import { getAuthCookies } from "@/components/auth/serverHelpers";
import { graphql } from "@/gql/student-schema";
import { mutateAPI } from "@/lib/fetch";
import { Answers, InvestigationId } from "@/types/answers";

const Mutation = graphql(`
  mutation SaveAnswersFromSet(
    $userId: ID!
    $investigationId: ID!
    $answerSet: [AnswerInput]
  ) {
    saveAnswersFromSet(
      userId: $userId
      investigationId: $investigationId
      answerSet: $answerSet
    ) {
      id
    }
  }
`);

export default async function saveAnswers(
  investigationId: NonNullable<InvestigationId>,
  answers: Answers
) {
  const { craftUserId, craftToken, craftUserStatus } = await getAuthCookies();

  if (!craftUserId || !craftToken) {
    return "refreshError";
  }

  if (craftUserStatus === "pending") {
    return "statusError";
  }

  const answerSet = Object.values(answers).map(({ data, id, questionId }) => {
    return {
      data: JSON.stringify(data),
      id,
      questionId,
    };
  });

  const { data, error } = await mutateAPI({
    query: Mutation,
    variables: {
      userId: craftUserId,
      investigationId,
      answerSet,
    },
    token: craftToken,
  });

  if (data?.saveAnswersFromSet) {
    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}
