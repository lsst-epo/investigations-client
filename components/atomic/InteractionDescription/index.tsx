import { FunctionComponent, ReactNode, useId } from "react";
import * as Styled from "./styles";

interface InteractionDescriptionProps {
  description?: string | null;
  children: (id: string) => ReactNode;
  type?: "success" | "error" | "warning" | "info";
  className?: string;
  isOutput?: boolean;
}

const InteractionDescription: FunctionComponent<
  InteractionDescriptionProps
> = ({ description, type = "info", className, children, isOutput = false }) => {
  const id = useId();
  const sharedProps = {
    "data-description-type": type,
    className,
  };
  const descriptionProps = {
    id,
  };
  const outputProps = {
    as: "output",
    htmlFor: id,
  };

  const propsToUse = isOutput ? outputProps : descriptionProps;

  return (
    <Styled.Container>
      {children(id)}
      <Styled.Description {...{ ...sharedProps, ...propsToUse }}>
        {description}
      </Styled.Description>
    </Styled.Container>
  );
};

export default InteractionDescription;
