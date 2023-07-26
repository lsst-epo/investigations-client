import { FunctionComponent } from "react";
import { InlineReviewPart } from "..";

const InlineReadonly: FunctionComponent<InlineReviewPart> = ({ value }) => (
  <span>{value}</span>
);

InlineReadonly.displayName = "Review.Inline.Readonly";

export default InlineReadonly;
