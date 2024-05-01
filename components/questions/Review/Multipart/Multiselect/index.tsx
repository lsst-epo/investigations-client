import { FunctionComponent } from "react";
import { Option } from "@/components/shapes/option";
import * as Styled from "./styles";
import { MultiselectInput } from "@/types/answers";

const InlineMultiselect: FunctionComponent<{
  value: MultiselectInput;
  options: Array<Option>;
}> = ({ value = [undefined], options }) => {
  return (
    <Styled.SelectionList>
      {value.map((value, i) => (
        <Styled.Selection key={i}>
          <Styled.SelectionText {...{ options, value }} />
        </Styled.Selection>
      ))}
    </Styled.SelectionList>
  );
};

InlineMultiselect.displayName = "Review.Inline.Multiselect";

export default InlineMultiselect;
