import { graphql, useFragment } from "@/gql/public-schema";
import { AuthFragmentFragmentDoc } from "@/gql/public-schema/graphql";
import mutationClient from "@/lib/fetch/mutate";
import { setAuthCookies } from "@/components/auth/serverHelpers";

const RefreshMutation = graphql(`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      ...AuthFragment
    }
  }
`);

const refreshTokens = async (refreshToken: string) => {
  const { data, error } = await mutationClient({
    skipExpirationCheck: true,
    skipAuthorizationHeaders: true,
  })(RefreshMutation, {
    refreshToken,
  });

  if (error) {
    throw new Error(error.message);
  }

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(AuthFragmentFragmentDoc, data?.refreshToken);

  if (authData) {
    setAuthCookies(authData);

    return authData;
  }
};

export default refreshTokens;
