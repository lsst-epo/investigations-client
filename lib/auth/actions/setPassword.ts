"use server";

import { graphql } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";
import { zfd } from "zod-form-data";
import z from "zod";
import { resetPasswordSession } from "../session/temporary";
import signIn from "./signIn";

const resetPasswordSchema = zfd.formData({
  password: zfd.text(z.string().min(6)),
  code: zfd.text(z.string().min(1)),
  id: zfd.text(z.string().uuid()),
});

// // https://graphql-authentication.jamesedmonston.co.uk/usage/authentication#set-password
const Mutation = graphql(`
  mutation SetPassword($password: String!, $code: String!, $id: String!) {
    setPassword(password: $password, code: $code, id: $id)
  }
`);

const setPassword: FormHandler = async (
  state: FormState,
  formData: FormData
) => {
  const { data: variables, error: validationError } =
    resetPasswordSchema.safeParse(formData);

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
    const session = resetPasswordSession().get();
    if (session) {
      const { email, returnTo } = session;
      const login = new FormData();
      login.set("password", variables.password);
      login.set("email", email);

      resetPasswordSession().destroy();

      return signIn(null, login, returnTo || undefined);
    } else {
      return { status: "success" };
    }
  }
};

export default setPassword;
