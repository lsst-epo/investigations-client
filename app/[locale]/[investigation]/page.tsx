"use client";

import { FunctionComponent } from "react";
import { notFound } from "next/navigation";
import { Container } from "@rubin-epo/epo-react-lib";
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

  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
};

export default InvestigationLanding;
