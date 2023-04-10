import { IconComposer } from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";
import { FunctionComponent, MouseEventHandler } from "react";

interface ExpandContractProps {
  isOpen?: boolean;
  onToggle?: MouseEventHandler<HTMLButtonElement>;
  controlsId?: string;
  className?: string;
}

const ExpandContract: FunctionComponent<ExpandContractProps> = ({
  isOpen,
  onToggle,
  controlsId,
  className,
}) => {
  return (
    <Styled.Button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      className={className}
    >
      <IconComposer icon={isOpen ? "close" : "expand"} />
    </Styled.Button>
  );
};

ExpandContract.displayName = "Atomic.ExpandContract";

export default ExpandContract;
