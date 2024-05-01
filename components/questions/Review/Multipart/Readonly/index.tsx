import { TextInput } from "@/types/answers";
import { FunctionComponent } from "react";

const InlineReadonly: FunctionComponent<{ text: TextInput }> = ({ text }) => (
  <span>{text}</span>
);

InlineReadonly.displayName = "Review.Inline.Readonly";

export default InlineReadonly;
