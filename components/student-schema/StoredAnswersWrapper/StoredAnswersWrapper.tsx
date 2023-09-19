import { StoredAnswersProvider } from "@/contexts/StoredAnswersContext";
import { queryAPI } from "@/lib/fetch";
import { getAuthCookies } from "@/components/auth/serverHelpers";
import { graphql } from "@/gql/student-schema";
import type { Query } from "@/gql/student-schema/graphql";
import type { InvestigationId } from "@/types/answers";

const StoredAnswersQuery = graphql(`
  query StoredAnswers($userId: ID, $investigationId: ID) {
    answers(userId: $userId, investigationId: $investigationId) {
      data
      questionId
      id
    }
  }
`);

export default async function StoredAnswersWrapper({
  investigationId,
  children,
}: {
  investigationId: InvestigationId;
  children: React.ReactNode;
}) {
  const { craftToken, craftUserId } = await getAuthCookies();

  const { data } = await queryAPI({
    query: StoredAnswersQuery,
    variables: {
      userId: craftUserId,
      investigationId,
    },
    token: craftToken,
  });

  // TODO: replace temporary type assertion due to codegen not typing response correctly
  // replace in <StoredAnswersProvider> as well
  const answers = data?.answers as Query["answers"];

  return (
    <StoredAnswersProvider answers={answers} investigationId={investigationId}>
      {children}
    </StoredAnswersProvider>
  );
}
