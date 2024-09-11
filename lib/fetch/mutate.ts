import {
  deleteAuthCookies,
  getAuthCookies,
} from "@/components/auth/serverHelpers";
import { Client, createClient, fetchExchange, mapExchange } from "@urql/core";
import { authExchange } from "@urql/exchange-auth";
import isSessionExpired from "@/lib/auth/session/expired";
import refreshTokens from "@/lib/auth/session/refresh";

let API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Check to see if the environment variable DOCKER_GATEWAY_IP is populated, if so
// then the URL should be constructed for a Docker static build
if (
  process.env.DOCKERIZED &&
  process.env.DOCKER_GATEWAY_IP &&
  parseInt(process.env.DOCKER_GATEWAY_IP) !== -1 && // The getApiGatewayURL script returns -1 if an error occurs grabbing the IP
  process.env.DOCKER_GATEWAY_PORT
) {
  API_URL = `http://${process.env.DOCKER_GATEWAY_IP}:${process.env.DOCKER_GATEWAY_PORT}/api`;
}

interface MutationClientProps {
  skipExpirationCheck?: boolean;
  skipAuthorizationHeaders?: boolean;
}

type MutationClientFactory = (
  options?: MutationClientProps
) => Client["mutation"];

const mutationClient: MutationClientFactory = (options = {}) => {
  const { skipExpirationCheck = false, skipAuthorizationHeaders = false } =
    options;
  const { craftToken, craftRefreshToken } = getAuthCookies();
  let token = craftToken;
  let refreshToken = craftRefreshToken;

  const { mutation } = createClient({
    url: API_URL,
    exchanges: [
      mapExchange({
        onError(error) {
          if (error.message.includes("Refresh")) {
            deleteAuthCookies();
          }
        },
      }),
      authExchange(async ({ appendHeaders }) => {
        return {
          addAuthToOperation(operation) {
            if (!token || skipAuthorizationHeaders) return operation;
            return appendHeaders(operation, {
              Authorization: `JWT ${token}`,
            });
          },
          didAuthError(error) {
            if (skipAuthorizationHeaders || skipExpirationCheck) {
              return false;
            }

            return error.graphQLErrors.some(
              (e) => e.extensions?.code === "INVALID"
            );
          },
          willAuthError: () => {
            if (token && !skipExpirationCheck) {
              return isSessionExpired(token);
            }
            return false;
          },
          async refreshAuth() {
            if (refreshToken) {
              const tokens = await refreshTokens(refreshToken);

              token = tokens?.jwt || undefined;
              refreshToken = tokens?.refreshToken || undefined;
            }
          },
        };
      }),
      fetchExchange,
    ],
  });

  return mutation;
};

export default mutationClient;
