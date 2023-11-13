import { ComponentType, FunctionComponent } from "react";
import SimpleReview from "@/components/questions/SimpleQuestion/Review";
import InlineReview from "@/components/questions/InlineQuestion/Review";
import { AnswerData } from "@/types/answers";

export interface ReviewProps {
  id: string;
  type: string;
  number: number;
  value?: AnswerData;
  config: any;
}

const QUESTION_MAP: Record<string, ComponentType<any>> = {
  text: SimpleReview,
  select: SimpleReview,
  widget: SimpleReview,
  textarea: SimpleReview,
  multiPart: InlineReview,
};

const ReviewFactory: FunctionComponent<ReviewProps> = ({
  id,
  type,
  config,
  value,
  number,
}) => {
  const Review = QUESTION_MAP[type];

  if (!Review) {
    return null;
  }

  return <Review {...{ ...config, value, id, type, number }} />;
};

ReviewFactory.displayName = "Factory.Review";

export default ReviewFactory;
