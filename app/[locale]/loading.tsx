"use client";

import { FunctionComponent } from "react";
import { CircularLoader, Container } from "@rubin-epo/epo-react-lib";

const RootLoading: FunctionComponent = () => {
  return (
    <Container>
      <CircularLoader isVisible={true} speed="fast" />
    </Container>
  );
};

export default RootLoading;
