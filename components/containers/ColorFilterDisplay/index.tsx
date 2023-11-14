import { FunctionComponent } from "react";
import ColorTool from "@rubin-epo/epo-widget-lib/ColorTool";
import { FragmentType, useFragment } from "@/gql/public-schema";
import { Fragment } from "../ColorFilterTool/ColorFilterTool";
import { formatObjectGroups } from "../helpers";

interface ColorFilterDisplayProps {
  data: FragmentType<typeof Fragment>;
  className?: string;
  value: any;
}

const ColorFilterDisplay: FunctionComponent<ColorFilterDisplayProps> = ({
  data,
  className,
  value,
}) => {
  const { colorFilterToolObjects } = useFragment(Fragment, data);

  const objectGroups = formatObjectGroups(colorFilterToolObjects);

  return (
    <ColorTool
      className={className}
      data={[]}
      selectionCallback={() => undefined}
      selectedData={value || objectGroups[0].objects[0]}
      isDisplayOnly
    />
  );
};

ColorFilterDisplay.displayName = "Container.ColorFilterDisplay";

export default ColorFilterDisplay;
