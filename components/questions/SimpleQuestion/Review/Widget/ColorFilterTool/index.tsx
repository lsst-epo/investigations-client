import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ColorFilterTool from "@/components/containers/ColorFilterTool";
import { WidgetInput } from "@/types/answers";

const Fragment = graphql(`
  ...ColorFilterToolQuestion
`);

interface ColorFilterToolReviewProps {
  data: FragmentType<typeof Fragment>;
  value: WidgetInput;
}

/**
 * This implementation of the Color Filter Tool is for questions placed
 * in interactive content sections. It performs callbacks and saves it's data.
 */
const ColorFilterToolReview: FunctionComponent<ColorFilterToolReviewProps> = ({
  data,
  value,
  ...props
}) => {
  const { colorFilterTool } = useFragment(Fragment, data);
  console.log({ data, colorFilterTool });
  const { id, title } = colorFilterTool[0];

  return (
    <ColorFilterTool
      {...props}
      isDisplayOnly={true}
      onChangeCallback={() => {}}
      value={value?.[id]}
      data={colorFilterTool[0]}
    />
  );
};

ColorFilterToolReview.displayName = "Review.Simple.Widget.ColorFilterTool";

export default ColorFilterToolReview;
