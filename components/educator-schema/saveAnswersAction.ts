"use server";

import { getAuthCookies } from "@/lib/auth/cookieService";
import { graphql } from "@/gql/student-schema";
import mutationClient from "@/lib/fetch/mutate";
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
  const { craftUserId, craftToken, craftUserStatus, craftRefreshToken } = await getAuthCookies();

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

  const { data, error } = await mutationClient({ craftToken: craftToken, craftRefreshToken: craftRefreshToken})(Mutation, {
    userId: craftUserId,
    investigationId,
    answerSet,
  });

  if (data?.saveAnswersFromSet) {
    return data;
  } else if (error) {
    if (error.message.includes("Refresh")) {
      return "refreshError";
    }
    throw new Error(error.message);
  }
}
