import { graphql } from "@/gql/public-schema";
import mutationClient from "@/lib/fetch/mutate";

const Mutation = graphql(`
  mutation DeleteRefreshToken($refreshToken: String!) {
    deleteRefreshToken(refreshToken: $refreshToken)
  }
`);

/** Revokes current fresh token, wrap in a try catch so it
 *  never disrupts client-side logout or refresh.
 */
const revokeRefreshToken = async (refreshToken: string) => {
  try {
    await mutationClient({
      skipExpirationCheck: true,
    })(Mutation, { refreshToken });
  } catch (error) {
    console.warn(error);
  }
};

export default revokeRefreshToken;
