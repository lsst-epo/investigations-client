import { FunctionComponent } from "react";

const InlineReadonly: FunctionComponent<{ text: string }> = ({ text }) => (
  <span>{text}</span>
);

InlineReadonly.displayName = "Review.Inline.Readonly";

export default InlineReadonly;
