import { FunctionComponent } from "react";
import { WidgetReviewProps } from "..";
import ColorFilterDisplay from "@/components/dynamic/ColorFilterDisplay";

const ColorFilterToolReview: FunctionComponent<WidgetReviewProps> = ({
  data,
  value,
  ...props
}) => {
  const { colorFilterTool } = data;
  const { id } = colorFilterTool[0];

  return (
    <ColorFilterDisplay
      {...props}
      data={colorFilterTool[0]}
      value={value?.[id]}
    />
  );
};

ColorFilterToolReview.displayName = "Review.Widget.ColorFilterTool";

export default ColorFilterToolReview;
