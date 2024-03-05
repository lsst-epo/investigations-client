import { FunctionComponent } from "react";
import * as Styled from "./styles";

const ReadOnlyCell: FunctionComponent<{ value?: string }> = ({ value }) => {
  return <Styled.ReadOnly type="text" defaultValue={value} readOnly />;
};

export default ReadOnlyCell;
