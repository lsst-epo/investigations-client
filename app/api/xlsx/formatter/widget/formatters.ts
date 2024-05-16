import getFilteredBase64 from "@rubin-epo/epo-widget-lib/ColorToolServer";
import { WidgetFormatter } from ".";
import { fallbackLng } from "@/lib/i18n/settings";

export const colorTool: WidgetFormatter = async ({ data, value, cell }) => {
  const { colorFilterTool } = data;
  const { id } = colorFilterTool[0];
  const filters = value[id]?.filters;

  if (!filters) return;

  const image = await getFilteredBase64(filters, "jpg");
  const {
    workbook,
    worksheet,
    fullAddress: { col },
  } = cell;

  const imageId = workbook.addImage({ base64: image, extension: "jpeg" });

  worksheet.columns[col - 1].width = 50;
  worksheet.getRow(2).height = 225;
  worksheet.addImage(imageId, {
    tl: { col: col - 1, row: 1 },
    ext: { width: 400, height: 400 },
    editAs: undefined,
  });
};

export const lightCurveTool: WidgetFormatter = async ({ value, cell, t }) => {
  const { userMagnitude } = value;

  cell.value = userMagnitude
    ? t("widgets.light_curve.magnitude", { value: userMagnitude })
    : t("review.no_selection");
};

export const sourceSelector: WidgetFormatter = async ({
  value,
  locale = fallbackLng,
  cell,
  t,
}) => {
  const { selectedSource = [] } = value;

  const listFormatter = new Intl.ListFormat(locale, {
    style: "long",
    type: "conjunction",
  });

  cell.value = listFormatter.format(selectedSource) || t("review.no_selection");
};

export const isochronePlot: WidgetFormatter = async ({ value, cell, t }) => {
  const { age, distance } = value;

  cell.value = t("epo-widget-lib:isochrone_plot.output", { age, distance });
};
