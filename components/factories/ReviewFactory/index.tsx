import { ComponentType, FunctionComponent } from "react";
import { QuestionCategory } from "@/types/questions";
import SimpleReview from "@/components/questions/SimpleQuestion/Review";
import InlineReview from "@/components/questions/InlineQuestion/Review";

export interface ReviewProps {
  id: string;
  category: QuestionCategory;
  config: any;
}

const QUESTION_MAP: Record<string, ComponentType<any>> = {
  simple: SimpleReview,
  inline: InlineReview,
};

const ReviewFactory: FunctionComponent<ReviewProps> = ({
  id,
  category,
  config,
}) => {
  const Review = QUESTION_MAP[category];

  if (!Review) {
    return null;
  }

  return <Review {...{ ...config, id }} />;
};

ReviewFactory.displayName = "Factory.Review";

export default ReviewFactory;
