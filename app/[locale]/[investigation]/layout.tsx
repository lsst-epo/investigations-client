import { Metadata } from "next";
import { RootLayoutParams } from "../layout";
import { PropsWithChildren } from "react";
import Header from "@/components/page/Header/Header";
import Body from "@/global/Body";
import { queryAPI } from "@/lib/fetch";
import { graphql } from "@/gql/public-schema";
import StudentStoredAnswers from "@/components/student-schema/StoredAnswersWrapper";
import EducatorStoredAnswers from "@/components/educator-schema/StoredAnswersWrapper";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";

export interface InvestigationParams {
  investigation: string;
}

export interface InvestigationLandingProps {
  params: RootLayoutParams & InvestigationParams;
}

const MockInvestigations: { [key: string]: string } = {
  "coloring-the-universe": "Coloring the Universe",
};

export async function generateMetadata({
  params: { investigation },
}: InvestigationLandingProps): Promise<Metadata> {
  const title = MockInvestigations[investigation];

  return { title, twitter: { title } };
}

const InvestigationLandingLayout: (
  props: PropsWithChildren<InvestigationLandingProps>
) => Promise<JSX.Element> = async ({
  children,
  params: { locale, investigation },
}) => {
  const site = locale === "en" ? "default" : locale;

  const { data: investigationData } = await queryAPI({
    query: InvestigationIdQuery,
    variables: {
      site: [site],
      uri: [investigation],
    },
  });

  const { craftToken } = getAuthCookies();
  const user = getUserFromJwt(craftToken);
  const StoredAnswersComponent =
    user?.group === "educators" ? EducatorStoredAnswers : StudentStoredAnswers;

  return (
    <Body>
      <Header />
      {/* @ts-expect-error Server Component */}
      <StoredAnswersComponent investigationId={investigationData?.entry?.id}>
        {children}
      </StoredAnswersComponent>
    </Body>
  );
};

export default InvestigationLandingLayout;

const InvestigationIdQuery = graphql(`
  query InvestigationId($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      id
    }
  }
`);
