import { FunctionComponent } from "react";
import * as Styled from "./styles";
import { BaseReviewProps } from "@/types/questions";
import { MultiselectInput } from "@/types/answers";

type SimpleMultiselectProps = BaseReviewProps<MultiselectInput>;

const SimpleMultiselect: FunctionComponent<SimpleMultiselectProps> = ({
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

SimpleMultiselect.displayName = "Review.Simple.Multiselect";

export default SimpleMultiselect;
