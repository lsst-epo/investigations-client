"use server";

import { Answers } from "@/types/answers";

export async function saveAnswers(answers?: Answers) {
  console.log(answers);

  return new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO implement mutation(s)
}
