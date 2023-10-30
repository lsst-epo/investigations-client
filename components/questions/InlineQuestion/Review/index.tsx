import { ComponentType, FunctionComponent } from "react";
import { BaseReviewProps, InlineQuestionType } from "@/types/questions";
import * as Styled from "./styles";

import Readonly from "./Readonly";
import Text from "./Text";
import Multiselect from "./Multiselect";

export interface InlineReviewPart {
  type: InlineQuestionType;
  value: string | string[];
}

export interface InlineReviewProps extends BaseReviewProps {
  parts: InlineReviewPart[];
}

const REVIEW_MAP: Record<InlineQuestionType, ComponentType<any>> = {
  text: Text,
  select: Text,
  multiselect: Multiselect,
  readonly: Readonly,
};

const InlineReview: FunctionComponent<InlineReviewProps> = ({
  number,
  parts = [],
}) => {
  return (
    <Styled.ReviewListInlineItem value={number}>
      {parts.map(({ type, value }, i) => {
        const Review = REVIEW_MAP[type];

        if (!Review) {
          console.error(`"${type}" is not a valid review type.`);

          return null;
        }

        return <Review {...{ type, value }} key={i} />;
      })}
    </Styled.ReviewListInlineItem>
  );
};

InlineReview.displayName = "Review.Inline";

export default InlineReview;
