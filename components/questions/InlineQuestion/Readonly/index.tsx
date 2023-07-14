import { FunctionComponent } from "react";
import { InlineReadonlyPart } from "..";

const InlineReadonly: FunctionComponent<InlineReadonlyPart> = ({ text }) => (
  <span>{text}</span>
);

InlineReadonly.displayName = "Questions.Inline.Readonly";

export default InlineReadonly;
