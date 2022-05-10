import { GraphQLClient } from "graphql-request";

let API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function queryAPI(query, token, previewToken) {
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

  const isPreview = previewToken && previewToken !== "";
  const url = isPreview ? `${API_URL}?token=${previewToken}` : API_URL;

  const client = new GraphQLClient(url);
  const headers = !token
    ? {}
    : {
        authorization: `JWT ${token}`,
      };

  return client
    .request(query, {}, headers)
    .then((data) => data)
    .catch((error) => {
      process.exitCode = 1;
      console.warn("Error:", error.response);
      return error.response;
    });
}
