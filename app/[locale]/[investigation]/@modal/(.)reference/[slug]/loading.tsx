import { FunctionComponent } from "react";
import CircularLoader from "@rubin-epo/epo-react-lib/CircularLoader";
import * as Styled from "./styles";

const ReferenceModalLoading: FunctionComponent = () => {
  return (
    <Styled.LoaderContainer>
      <CircularLoader isVisible={true} speed="fast" />
    </Styled.LoaderContainer>
  );
};

export default ReferenceModalLoading;
