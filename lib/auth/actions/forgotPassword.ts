"use server";

import { graphql } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";
import z from "zod";
import { zfd } from "zod-form-data";
import { resetPasswordSession } from "../session/temporary";

const forgotPasswordSchema = zfd.formData({
  email: zfd.text(z.string().email()),
});

const Mutation = graphql(`
  mutation ForgottenPassword($email: String!) {
    forgottenPassword(email: $email)
  }
`);

const forgotPassword: FormHandler = async (
  state: FormState,
  formData: FormData
) => {
  const { data: variables, error: validationError } =
    forgotPasswordSchema.safeParse(formData);

  if (validationError) {
    return { status: "error", message: validationError.issues[0].message };
  }

  const { error } = await mutateAPI({
    query: Mutation,
    variables,
  });

  if (error) {
    return { status: "error", message: error.message };
  } else {
    resetPasswordSession().create(variables.email);

    return { status: "success" };
  }
};

export default forgotPassword;
