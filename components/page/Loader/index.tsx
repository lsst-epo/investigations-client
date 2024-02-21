import { FunctionComponent } from "react";
import CircularLoader from "@rubin-epo/epo-react-lib/CircularLoader";
import * as Styled from "./styles";

const Loader: FunctionComponent<{ height?: string }> = ({ height }) => {
  return (
    <Styled.LoaderContainer style={{ height }}>
      <CircularLoader isVisible={true} speed="fast" />
    </Styled.LoaderContainer>
  );
};

Loader.displayName = "Page.Loader";

export default Loader;
