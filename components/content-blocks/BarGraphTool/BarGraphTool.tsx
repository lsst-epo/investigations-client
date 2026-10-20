import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import BarGraph, { type Histogram } from "./BarGraph";

const Fragment = graphql(`
  fragment BarGraphToolBlock on contentBlocks_barGraphTool_BlockType {
    __typename
    id
    title
    yAxisLabel
    xAxisLabel
    histogramDatasets {
      ... on histogramDatasets_dataset_BlockType {
        id
        title
        xAxisLabel
        yAxisLabel
        xAxisMin
        yAxisMax
        data {
          ... on datasets_histogramDataset_Entry {
            id
            title
            histogramPoints {
              ... on histogramPoints_point_BlockType {
                id
                label
                xValue
                yValue
              }
            }
          }
        }
      }
    }
  }
`);

type Point = { label?: string | null; xValue?: number; yValue: number };

const toNumber = (value: unknown) => {
  const number = typeof value === "number" ? value : parseFloat(String(value));

  return Number.isFinite(number) ? number : undefined;
};

const getStep = (bins: Array<number>) => {
  const sorted = [...new Set(bins)].sort((a, b) => a - b);
  const gaps = sorted.slice(1).map((bin, i) => bin - sorted[i]);

  return gaps.length ? Math.min(...gaps) : 1;
};

/** points with no numeric x value are categorical bars named by their label */
const toHistogramData = (
  points: Array<Point>,
): Pick<Histogram, "data" | "step" | "barLabels"> => {
  const isCategorical = points.some(({ xValue }) => xValue === undefined);

  if (isCategorical) {
    return {
      data: points.map(({ yValue }, bin) => ({ bin, value: yValue })),
      step: 1,
      barLabels: points.map(({ label }) => label ?? ""),
    };
  }

  const data = points
    .map(({ label, xValue, yValue }) => ({
      bin: xValue as number,
      value: yValue,
      label: label ?? undefined,
    }))
    .sort((a, b) => a.bin - b.bin);

  return { data, step: getStep(data.map(({ bin }) => bin)) };
};

export default function BarGraphToolBlock(props: {
  data: FragmentType<typeof Fragment>;
}) {
  const { title, yAxisLabel, xAxisLabel, histogramDatasets } = useFragment(
    Fragment,
    props.data,
  );

  const histograms = histogramDatasets.flatMap((dataset): Array<Histogram> => {
    const [entry] = dataset?.data ?? [];

    if (!dataset?.id || entry?.__typename !== "datasets_histogramDataset_Entry")
      return [];

    const points = entry.histogramPoints.flatMap((point): Array<Point> => {
      const yValue = toNumber(point?.yValue);

      if (yValue === undefined) return [];

      return [
        {
          label: point?.label,
          xValue: toNumber(point?.xValue),
          yValue,
        },
      ];
    });

    if (!points.length) return [];

    return [
      {
        ...toHistogramData(points),
        id: dataset.id,
        label: dataset.title ?? entry.title ?? "",
        horizontalLabel: dataset.xAxisLabel ?? xAxisLabel ?? "",
        verticalLabel: dataset.yAxisLabel ?? yAxisLabel ?? "",
        xMin: toNumber(dataset.xAxisMin),
        yMax: toNumber(dataset.yAxisMax),
        header: dataset.title ?? entry.title ?? "",
        icon: "BarChart",
      },
    ];
  });

  if (!histograms.length) return null;

  return (
    <div>
      <BarGraph histograms={histograms} />
    </div>
  );
}

BarGraphToolBlock.displayName = "ContentBlock.BarGraphTool";
