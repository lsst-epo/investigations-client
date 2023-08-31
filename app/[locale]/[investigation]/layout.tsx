import { Metadata } from "next";
import { RootLayoutParams } from "../layout";
import { PropsWithChildren } from "react";
import Header from "@/components/page/Header/Header";
import Body from "@/global/Body";
import { queryAPI } from "@/lib/fetch";
import { graphql } from "@/gql";
import { Query } from "@/gql/graphql";
import { StoredAnswersProvider } from "@/components/answers/StoredAnswersContext";
import { getAuthCookies } from "@/components/auth/serverHelpers";

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

  const { craftUserId } = getAuthCookies();

  const { data } = await queryAPI({
    query: StoredAnswersQuery,
    variables: {
      userId: craftUserId,
      investigationId: investigationData?.entry?.id,
    },
  });

  // TODO: replace temporary type assertion due to codegen not typing response correctly
  // replace in <StoredAnswersProvider> as well
  const answers = data?.answers as Query["answers"];

  return (
    <Body>
      <Header />
      <StoredAnswersProvider
        answers={answers}
        investigationId={investigationData?.entry?.id}
      >
        {children}
      </StoredAnswersProvider>
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

const StoredAnswersQuery = graphql(`
  query StoredAnswers($userId: ID, $investigationId: ID) {
    answers(userId: $userId, investigationId: $investigationId) {
      data
      questionId
      id
    }
  }
`);
