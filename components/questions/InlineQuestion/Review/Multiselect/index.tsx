import { FunctionComponent } from "react";
import * as Styled from "./styles";

const InlineMultiselect: FunctionComponent<{ value: string[] }> = ({
  value = [undefined],
}) => {
  return (
    <Styled.SelectionList>
      {value.map((value, i) => (
        <Styled.Selection key={i}>
          <Styled.SelectionText value={value} type="select" />
        </Styled.Selection>
      ))}
    </Styled.SelectionList>
  );
};

InlineMultiselect.displayName = "Review.Inline.Multiselect";

export default InlineMultiselect;
