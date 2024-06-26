import { FunctionComponent } from "react";
import { graphql, FragmentType, useFragment } from "@/gql/public-schema";
import { isEntryValid } from "@/helpers/gql";
import { WidgetQuestion } from "..";
import { getDataset } from "@/helpers/widgets";
import IsochronePlotContainer from "@/components/dynamic/IsochronePlot";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";

const Fragment = graphql(`
  fragment IsochronePlotQuestion on questionWidgetsBlock_isochronePlot_BlockType {
    __typename
    id
    dataset {
      ... on datasets_starCluster_Entry {
        id
        title
        ageLibrary: json {
          ... on datasets_Asset {
            url
          }
        }
        plotPoints {
          ... on datasets_Asset {
            url
          }
        }
        yMin: yAxisMin
        yMax: yAxisMax
        xMin: xAxisMin
        xMax: xAxisMax
      }
    }
  }
`);

const IsochronePlot: FunctionComponent<
  WidgetQuestion<FragmentType<typeof Fragment>>
> = ({ data, instructions, value = {}, ...props }) => {
  const { dataset } = useFragment(Fragment, data);
  const { datasetId } = value;

  const plot = getDataset(dataset, datasetId);

  if (plot && isEntryValid(plot, "datasets_starCluster_Entry")) {
    const { xMin, xMax, yMin, yMax, ageLibrary, plotPoints } = plot;

    const xAxis = { min: xMin, max: xMax };
    const yAxis = { min: yMin, max: yMax };

    const isochroneUrl = ageLibrary[0]?.url;
    const pointsUrl = plotPoints[0]?.url;

    if (!isochroneUrl || !pointsUrl) return null;

    return (
      <WidgetContainerWithModal {...{ instructions }}>
        <IsochronePlotContainer
          sources={{
            points: pointsUrl,
            isochrones: isochroneUrl,
          }}
          {...{ ...props, value, xAxis, yAxis }}
        />
      </WidgetContainerWithModal>
    );
  }

  return null;
};

IsochronePlot.displayName = "Questions.Widget.IsochronePlot";

export default IsochronePlot;
