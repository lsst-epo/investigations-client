import { graphql } from "@/gql/public-schema";
import { draftMode } from "next/headers";
import { RootProps } from "./layout";
import HomePageTemplate from "@/templates/HomePage";
import { notFound } from "next/navigation";
import SignOut from "@/components/molecules/auth/SignOutButton";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import { queryAPI } from "@/lib/fetch";
import { getSite } from "@/helpers";
import { FunctionComponent } from "react";
import Image from "next/image";

const CRAFT_HOMEPAGE_URI = "__home__";

export const revalidate = 60;

const Query = graphql(`
  query HomepageQuery($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      __typename
      ...HomepageTemplate
    }
  }
`);

const HomePage: FunctionComponent<RootProps> = async (props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { locale } = params;

  const site = getSite(locale);
  const { preview: previewToken } = searchParams;
  const { isEnabled: isPreview } = await draftMode();

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [CRAFT_HOMEPAGE_URI],
    },
    previewToken: isPreview && previewToken,
  });
  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);

  return data?.entry?.__typename === "homepage_homepage_Entry" ? (
    <>
      <Image
        src={data?.entry?.image?.[0].url?.directUrlOriginal}
        alt="alt"
        width="100"
        height="100"
      ></Image>
      <HomePageTemplate data={data.entry}>
        {user && <SignOut redirectTo={"/"} />}
      </HomePageTemplate>
    </>
  ) : (
    notFound()
  );
};

export default HomePage;
