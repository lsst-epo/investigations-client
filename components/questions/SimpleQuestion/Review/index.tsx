import { ComponentType, FunctionComponent } from "react";
import { BaseReviewProps, SimpleQuestionType } from "@/types/questions";
import * as Styled from "./styles";

import Text from "./Text";
import Widget from "./Widget";
import Multiselect from "./Multiselect";
import Select from "./Select";
import { SimpleQuestionData } from "@/types/answers";
import { Option } from "@/components/shapes/option";

export interface SimpleReviewProps extends BaseReviewProps {
  type: SimpleQuestionType;
  questionText: string;
  options?: Array<Option>;
  value?: SimpleQuestionData;
  widgetConfig?: { type: "filterTool"; [key: string]: any };
}
const REVIEW_MAP: Record<SimpleQuestionType, ComponentType<any>> = {
  text: Text,
  textarea: Text,
  select: Select,
  // multiselect: Multiselect,
  widget: Widget,
};

const SimpleReview: FunctionComponent<SimpleReviewProps> = ({
  number,
  type,
  questionText,
  ...props
}) => {
  console.log(type);
  const Review = REVIEW_MAP[type];

  if (!Review) {
    console.error(`"${type}" is not a valid review type.`);

    return null;
  }

  return (
    <Styled.ReviewListItem value={number}>
      {questionText}
      <Review {...props} />
    </Styled.ReviewListItem>
  );
};

SimpleReview.displayName = "Review.Simple";

export default SimpleReview;
