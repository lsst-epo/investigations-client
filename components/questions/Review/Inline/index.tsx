import { ComponentType, FunctionComponent } from "react";
import { BaseReviewProps, InlineQuestionType } from "@/types/questions";
import * as Styled from "./styles";

import Readonly from "./Readonly";
import Text from "./Text";
import Multiselect from "./Multiselect";
import { InlineQuestionData } from "@/types/answers";
import { Option } from "@/components/shapes/option";

export interface ReviewPart {
  options?: Array<Option>;
  type: InlineQuestionType;
  text: string;
  id: string;
}

export interface InlineReviewProps extends BaseReviewProps<InlineQuestionData> {
  parts: ReviewPart[];
}

const REVIEW_MAP: Record<InlineQuestionType, ComponentType<any>> = {
  text: Text,
  select: Text,
  multiselect: Multiselect,
  readonlyText: Readonly,
};

const InlineReview: FunctionComponent<InlineReviewProps> = ({
  number,
  parts = [],
  value: partsValues = {},
}) => {
  return (
    <Styled.ReviewListInlineItem value={number}>
      {parts.map(({ type, id, text, options }, i) => {
        const Review = REVIEW_MAP[type];

        if (!Review) {
          console.error(`"${type}" is not a valid inline question part.`);

          return null;
        }

        const value = id in partsValues ? partsValues[id] : undefined;

        return <Review {...{ value, type, text, options }} key={i} />;
      })}
    </Styled.ReviewListInlineItem>
  );
};

InlineReview.displayName = "Review.Inline";

export default InlineReview;
