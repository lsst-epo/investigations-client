import { FunctionComponent } from "react";
import CircularLoader from "@rubin-epo/epo-react-lib/CircularLoader";
import * as Styled from "./styles";

const Loader: FunctionComponent = () => {
  return (
    <Styled.LoaderContainer>
      <CircularLoader isVisible={true} speed="fast" />
    </Styled.LoaderContainer>
  );
};

Loader.displayName = "Page.Loader";

export default Loader;
