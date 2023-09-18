"use server";

import { getAuthCookies } from "@/components/auth/serverHelpers";
import { graphql } from "@/gql/student-schema";
import { mutateAPI } from "@/lib/fetch";
import { Answers, InvestigationId } from "@/types/answers";

export default async function saveAnswers(
  investigationId: InvestigationId,
  answers: Answers
) {
  const { craftUserId, craftToken } = await getAuthCookies();

  // if fresh token, loop through answers
  if (!craftToken) {
    // refresh the token
    // temporarily…
    return "refreshError";
  }

  // temporary logic until bulk mutations are supported by API
  const promises = Object.values(answers).map(async (answer, index) => {
    // only send one mutation for now to not overload API
    if (index > 0) return Promise.resolve("skipped");

    const { data, questionId, id: answerId } = answer;

    if (answerId) {
      const { data: responseData, error } = await mutateAPI({
        query: SaveMutation,
        variables: { answerId: Number(answerId), data },
        token: craftToken,
      });

      return error ? Promise.reject(error) : Promise.resolve(responseData);
    } else {
      const { data: responseData, error } = await mutateAPI({
        query: CreateMutation,
        variables: {
          userId: Number(craftUserId),
          investigationId: Number(investigationId),
          questionId: Number(questionId),
          data,
        },
        token: craftToken,
      });

      return error ? Promise.reject(error) : Promise.resolve(responseData);
    }
  });

  return Promise.all(promises)
    .then((values) => values)
    .catch((error) => {
      throw new Error(error);
    });
}

const CreateMutation = graphql(`
  mutation CreateAnswer(
    $userId: Int!
    $questionId: Int!
    $investigationId: Int!
    $data: String
  ) {
    createAnswer(
      userId: $userId
      questionId: $questionId
      investigationId: $investigationId
      data: $data
    ) {
      questionId
    }
  }
`);

const SaveMutation = graphql(`
  mutation SaveAnswer($answerId: Int!, $data: String) {
    saveAnswer(id: $answerId, data: $data) {
      questionId
    }
  }
`);
