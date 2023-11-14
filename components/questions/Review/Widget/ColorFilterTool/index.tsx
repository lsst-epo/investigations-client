import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import * as Styled from "./styles";
import { WidgetInput } from "@/types/answers";

const Fragment = graphql(`
  ...ColorFilterToolQuestion
`);

interface ColorFilterToolReviewProps {
  data: FragmentType<typeof Fragment>;
  value: WidgetInput;
}

const ColorFilterToolReview: FunctionComponent<ColorFilterToolReviewProps> = ({
  data,
  value,
  ...props
}) => {
  const { colorFilterTool } = useFragment(Fragment, data);
  const { id } = colorFilterTool[0];

  return (
    <Styled.Display {...props} data={colorFilterTool[0]} value={value?.[id]} />
  );
};

ColorFilterToolReview.displayName = "Review.Widget.ColorFilterTool";

export default ColorFilterToolReview;
