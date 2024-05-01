import { ComponentType, FunctionComponent } from "react";
import { AnswerType } from "@/types/questions";
import * as Review from "@/components/questions/Review";

export interface ReviewProps {
  id: string;
  type: AnswerType;
  number: number;
  config: any;
}

const QUESTION_MAP: Record<AnswerType, ComponentType<any>> = {
  text: Review.Text,
  select: Review.Select,
  widget: Review.Widget,
  textarea: Review.Text,
  multiPart: Review.Multipart,
  tabular: Review.Tabular,
  calculator: Review.Calculator,
  number: Review.Text,
};

const ReviewFactory: FunctionComponent<ReviewProps> = ({
  type,
  config,
  ...props
}) => {
  const Review = QUESTION_MAP[type];

  if (!Review) {
    console.error(`"${type}" is not a valid review type.`);
    return null;
  }

  return <Review {...{ ...props, ...config }} />;
};

ReviewFactory.displayName = "Factory.Review";

export default ReviewFactory;
