import { FunctionComponent } from "react";
import { WidgetInput } from "@/types/answers";
import IsochronePlot from "@rubin-epo/epo-widget-lib/IsochronePlot";
import useIsochrones from "@/lib/api/hooks/useIsochrones";
import usePoints from "@/lib/api/hooks/usePoints";

type Props = {
  sources: {
    points: string;
    isochrones: string;
  };
  onChangeCallback?: (value: any) => void;
  isDisplayOnly?: boolean;
  xAxis?: {
    min?: number;
    max?: number;
  };
  yAxis?: {
    min?: number;
    max?: number;
  };
  value?: WidgetInput;
};

const IsochronePlotContainer: FunctionComponent<Props> = ({
  sources: { points, isochrones },
  ...props
}) => {
  const { data: ageLibrary = { ages: {} }, isLoading: isIsochronesLoading } =
    useIsochrones(isochrones);
  const { data = [], isLoading: isPointsLoading } = usePoints(points);

  console.log(isIsochronesLoading || isPointsLoading);

  return (
    <IsochronePlot
      isLoading={isIsochronesLoading || isPointsLoading}
      {...{ ...props, ageLibrary, data }}
    />
  );
};

IsochronePlotContainer.displayName = "Dynamic.IsochronePlot";

export default IsochronePlotContainer;
