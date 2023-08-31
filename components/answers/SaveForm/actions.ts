"use server";

import { Answers } from "@/types/answers";

export async function saveAnswers(answers?: Answers) {
  console.log(answers);

  setTimeout(() => {
    return "Success!";
  }, 2000);
}
