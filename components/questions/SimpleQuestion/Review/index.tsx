import { ComponentType, FunctionComponent } from "react";
import {
  BaseReviewProps,
  SimpleQuestionType,
} from "@/components/shapes/questions";
import * as Styled from "./styles";

import Text from "./Text";
import Widget from "./Widget";
import Multiselect from "./Multiselect";

export interface SimpleReviewProps extends BaseReviewProps {
  type: SimpleQuestionType;
  questionText: string;
  value?: string | string[];
  widgetConfig?: { type: "filterTool"; [key: string]: any };
}
const REVIEW_MAP: Record<SimpleQuestionType, ComponentType<any>> = {
  text: Text,
  textarea: Text,
  select: Text,
  multiselect: Multiselect,
  widget: Widget,
};

const SimpleReview: FunctionComponent<SimpleReviewProps> = ({
  number,
  type,
  questionText,
  value,
  widgetConfig,
}) => {
  const Review = REVIEW_MAP[type];

  if (!Review) {
    console.error(`"${type}" is not a valid review type.`);

    return null;
  }

  return (
    <Styled.ReviewListItem value={number}>
      {questionText}
      <Review {...{ value, type, widgetConfig }} />
    </Styled.ReviewListItem>
  );
};

SimpleReview.displayName = "Review.Simple";

export default SimpleReview;
