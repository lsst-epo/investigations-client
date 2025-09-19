import { graphql } from "@/gql/public-schema";

export const AuthenticateMutation = graphql(`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      ...AuthFragment
    }
  }
`);