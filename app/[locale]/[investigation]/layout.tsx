import { Metadata } from "next";
import { RootLayoutParams } from "../layout";
import { FunctionComponent, PropsWithChildren } from "react";

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

const InvestigationLandingLayout: FunctionComponent<
  PropsWithChildren<InvestigationLandingProps>
> = ({ children }) => {
  return <>{children}</>;
};

export default InvestigationLandingLayout;
