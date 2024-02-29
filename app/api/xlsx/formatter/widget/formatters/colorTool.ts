import { WidgetFormatter } from "../..";
import getFilteredBase64 from "@rubin-epo/epo-widget-lib/ColorToolServer";

const colorToolFormatter: WidgetFormatter = async ({ data, value, cell }) => {
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

export default colorToolFormatter;
