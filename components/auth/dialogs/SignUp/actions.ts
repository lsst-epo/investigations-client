"use server";

import { setAuthCookies } from "@/components/auth/serverHelpers";
import { mutateAPI } from "@/lib/fetch";
import { graphql, useFragment } from "@/gql";
import { AuthFragmentFragmentDoc } from "gql/graphql";

function getVariables(formData: FormData) {
  const formDataObj = Object.fromEntries(formData);
  const { email, firstName, lastName, password } = formDataObj;

  // FormDataEntryValue is a union of string and File, but since we don't use
  // input[type='file'] we can assume this will always be a string
  const fullName =
    firstName && lastName
      ? `${firstName as string} ${lastName as string}`
      : undefined;

  return {
    email: email as string,
    password: password as string,
    fullName,
  };
}

export async function registerEducator(formData: FormData) {
  const variables = getVariables(formData);

  const { data, error } = await mutateAPI({
    query: EducatorMutation,
    variables,
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(
    AuthFragmentFragmentDoc,
    data?.registerEducators
  );

  if (authData) {
    setAuthCookies(authData);
    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}

export async function registerStudent(formData: FormData) {
  const variables = getVariables(formData);

  const { data, error } = await mutateAPI({
    query: StudentMutation,
    variables,
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(AuthFragmentFragmentDoc, data?.registerStudents);

  if (authData) {
    setAuthCookies(authData);
    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}

const EducatorMutation = graphql(`
  mutation RegisterEducator(
    $email: String!
    $password: String!
    $fullName: String
  ) {
    registerEducators(email: $email, password: $password, fullName: $fullName) {
      ...AuthFragment
    }
  }
`);

const StudentMutation = graphql(`
  mutation RegisterStudent(
    $email: String!
    $password: String!
    $fullName: String
  ) {
    registerStudents(email: $email, password: $password, fullName: $fullName) {
      ...AuthFragment
    }
  }
`);
