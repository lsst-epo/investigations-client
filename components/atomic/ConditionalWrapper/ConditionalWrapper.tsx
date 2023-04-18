import React, { ReactNode, FunctionComponent, PropsWithChildren } from "react";

interface ConditionalWrapperProps {
  if: boolean;
  with: (children: ReactNode) => JSX.Element;
}

const ConditionalWrapper: FunctionComponent<
  PropsWithChildren<ConditionalWrapperProps>
> = ({ if: condition, with: wrapper, children }) => {
  return condition ? wrapper(children) : <>{children}</>;
};

export default ConditionalWrapper;
