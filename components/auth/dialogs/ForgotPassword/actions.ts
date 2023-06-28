"use server";

import { graphql } from "@/gql";
import { mutateAPI } from "@/lib/fetch";

export async function forgotPassword(formData: FormData) {
  const formDataObj = Object.fromEntries(formData);

  // FormDataEntryValue is a union of string and File, but since we don't use
  // input[type='file'] we can assume this will always be a string
  const { data, error } = await mutateAPI({
    query: Mutation,
    variables: { email: formDataObj.email as string },
  });

  if (data?.forgottenPassword) {
    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}

const Mutation = graphql(`
  mutation ForgottenPassword($email: String!) {
    forgottenPassword(email: $email)
  }
`);
