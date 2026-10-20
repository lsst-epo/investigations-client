"use client";
import InteractiveHistogram from "@rubin-epo/epo-widget-lib/InteractiveHistogram";
import { getLinearScale } from "@rubin-epo/epo-widget-lib/lib/utils";

export interface Histogram {
  id: string;
  label: string;
  horizontalLabel: string;
  verticalLabel: string;
  data: Array<{ bin: number; value: number; label?: string }>;
  step: number;
  /** names each bar, for categorical data where `bin` is only the bar's index */
  barLabels?: Array<string>;
  xMin?: number;
  yMin?: number;
  yMax?: number;
  header?: string;
  icon?: React.ComponentProps<
    typeof InteractiveHistogram
  >["data"][number]["icon"];
}

const width = 600;
const height = width / 1.6;
const xTicks = 6;
const yTicks = 5;
const margin = { top: 50, right: 50, bottom: 30, left: 80 };

const toChartProps = ({
  data,
  step,
  barLabels,
  xMin,
  yMin = 0,
  yMax,
  ...histogram
}: Histogram) => {
  const bins = data.map(({ bin }) => bin);
  const xDomain = barLabels
    ? [-0.5, data.length - 0.5]
    : [xMin ?? Math.min(...bins), Math.max(...bins) + step];
  const yDomain = [yMin, yMax ?? Math.max(...data.map(({ value }) => value))];
  const labelsByBin = new Map(data.map(({ bin, label }) => [bin, label]));
  const getLabel = (bin: number) => barLabels?.[bin] ?? labelsByBin.get(bin);
  const renderTooltip = ({ bin, value }: { bin: number; value: number }) =>
    getLabel(bin) || String(value);
  const renderAriaLabel = ({ bin, value }: { bin: number; value: number }) =>
    `${getLabel(bin) || `${bin} – ${bin + step}`}: ${value}`;

  return {
    ...histogram,
    data,
    step,
    margin,
    width,
    height,
    xDomain,
    yDomain,
    yTicks,
    xTicks: barLabels ? 0 : xTicks,
    xScale: getLinearScale(xDomain, [margin.left, width - margin.right]),
    yScale: getLinearScale(yDomain, [height - margin.bottom, margin.top]),
    activeRange: [Math.min(...bins), Math.max(...bins)],
    renderTooltip,
    renderAriaLabel,
  };
};

export default function BarGraph({
  histograms,
}: {
  histograms: Array<Histogram>;
}) {
  return <InteractiveHistogram data={histograms.map(toChartProps)} />;
}
