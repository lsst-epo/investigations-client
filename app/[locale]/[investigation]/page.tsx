import { FunctionComponent } from "react";
import { notFound } from "next/navigation";
import { InvestigationLandingProps } from "./layout";

const MockInvestigations: { [key: string]: string } = {
  "coloring-the-universe": "Coloring the Universe",
};

const InvestigationLanding: FunctionComponent<InvestigationLandingProps> = ({
  params: { investigation },
}) => {
  const title = MockInvestigations[investigation];

  if (!title) {
    notFound();
  }

  return <h1>{title}</h1>;
};

export default InvestigationLanding;
