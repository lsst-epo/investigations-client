"use client";
import { ComponentType, FunctionComponent } from "react";
import useAnswer from "@/hooks/useAnswer";
import { BaseReviewProps, MultipartQuestionType } from "@/types/questions";
import { getLabelByValue } from "@/components/questions/utils";

import Readonly from "./Readonly";
import Generic from "./Text";
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

export interface MultipartReviewProps extends BaseReviewProps {
  parts: ReviewPart[];
}

const REVIEW_MAP: Record<MultipartQuestionType, ComponentType<any>> = {
  text: Generic,
  select: Generic,
  multiselect: Multiselect,
  readonlyText: Readonly,
  number: Generic,
};

const MultipartReview: FunctionComponent<MultipartReviewProps> = ({
  id,
  number,
  parts = [],
}) => {
  const { answer = {} } = useAnswer<MultipartQuestionData>(id);
  return (
    <Styled.MultipartItem value={number}>
      {parts.map(({ type, id, text, options }, i) => {
        const Review = REVIEW_MAP[type];

        if (!Review) {
          console.error(`"${type}" is not a valid multipart question part.`);
          return null;
        }

        let value;

        if(id in answer) {
          value = answer[id];
        }

        /**
         * Special considerations exist for `select` objects
         */
        if (type === "select") {
          let needle = value;
          if (value === undefined) {
            const [ answerKey ] = Object.values(answer);
            needle = answerKey;
          }

          const label = getLabelByValue(options, needle);
          value = label;
        }

        return <Review {...{ value, type, text, options }} key={i} />;
      })}
    </Styled.MultipartItem>
  );
};

MultipartReview.displayName = "Review.Multipart";

export default MultipartReview;
