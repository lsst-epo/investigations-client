"use server";

import { graphql } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";

export async function setPassword(
  formData: FormData,
  code: string,
  id: string
) {
  const formDataObj = Object.fromEntries(formData);

  // FormDataEntryValue is a union of string and File, but since we don't use
  // input[type='file'] we can assume this will always be a string
  const { data, error } = await mutateAPI({
    query: Mutation,
    variables: {
      password: formDataObj.password as string,
      code,
      id,
    },
  });

  if (data?.setPassword) {
    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}

// // https://graphql-authentication.jamesedmonston.co.uk/usage/authentication#set-password
const Mutation = graphql(`
  mutation SetPassword($password: String!, $code: String!, $id: String!) {
    setPassword(password: $password, code: $code, id: $id)
  }
`);
