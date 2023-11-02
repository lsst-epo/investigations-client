import * as Styled from "./styles";
import { FunctionComponent, PropsWithChildren } from "react";

const Body: FunctionComponent<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => {
  return (
    <Styled.Body className={className}>
      <Styled.WideWidthContainer>{children}</Styled.WideWidthContainer>
    </Styled.Body>
  );
};

Body.displayName = "Global.Body";

export default Body;
