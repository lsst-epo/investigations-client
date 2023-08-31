"use server";

import { getAuthCookies } from "@/components/auth/serverHelpers";
import { Answers, InvestigationId } from "@/types/answers";

export async function saveAnswers(
  investigationId: InvestigationId,
  answers?: Answers
) {
  const { craftUserId } = getAuthCookies();

  console.log({ craftUserId, investigationId, answers });

  return new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO implement mutation(s)
}
