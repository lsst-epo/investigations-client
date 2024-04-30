"use client";
import { ComponentType, FunctionComponent } from "react";
import useAnswer from "@/hooks/useAnswer";
import { BaseReviewProps, MultipartQuestionType } from "@/types/questions";

import Readonly from "./Readonly";
import Text from "./Text";
import Multiselect from "./Multiselect";
import { MultipartQuestionData } from "@/types/answers";
import { Option } from "@/components/shapes/option";
import * as Styled from "./styles";

export interface ReviewPart {
  options?: Array<Option>;
  type: MultipartQuestionType;
  text: string;
  id: string;
}

export interface InlineReviewProps extends BaseReviewProps {
  parts: ReviewPart[];
}

const REVIEW_MAP: Record<MultipartQuestionType, ComponentType<any>> = {
  text: Text,
  select: Text,
  multiselect: Multiselect,
  readonlyText: Readonly,
};

const InlineReview: FunctionComponent<InlineReviewProps> = ({
  id,
  number,
  parts = [],
}) => {
  const { answer = {} } = useAnswer<MultipartQuestionData>(id);

  return (
    <Styled.ReviewListInlineItem value={number}>
      {parts.map(({ type, id, text, options }, i) => {
        const Review = REVIEW_MAP[type];

        if (!Review) {
          console.error(`"${type}" is not a valid inline question part.`);

          return null;
        }

        const value = id in answer ? answer[id] : undefined;

        return <Review {...{ value, type, text, options }} key={i} />;
      })}
    </Styled.ReviewListInlineItem>
  );
};

InlineReview.displayName = "Review.Inline";

export default InlineReview;
