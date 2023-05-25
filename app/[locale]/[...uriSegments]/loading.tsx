"use client";

import { FunctionComponent } from "react";
import { CircularLoader } from "@rubin-epo/epo-react-lib";

const RootLoading: FunctionComponent = () => {
  return <CircularLoader isVisible={true} />;
};

export default RootLoading;
