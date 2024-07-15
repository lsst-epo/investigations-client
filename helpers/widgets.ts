import sample from "lodash/sample";
import { Alert } from "@/lib/api/hooks/useAlerts";
import { resizeCantoImage } from "./assets";

export const combineAlertsAndImages = (
  alerts: Array<Alert | any>,
  images: Array<any>
) => {
  const size = 240;

  return {
    alerts: alerts
      .map(({ id, ...alert }, i) => {
        const image = images.find(({ name }) => {
          return name.includes(id);
        });

        if (!image) return undefined;

        return {
          id,
          ...alert,
          image: {
            width: size,
            height: size,
            url: resizeCantoImage(image.url.directUrlPreview, size),
          },
        };
      })
      .filter((alert) => !!alert),
    size,
  };
};

export const percentageMapSources = <T extends { x: any; y: any; radius: any }>(
  sources: Array<T>
) =>
  sources.map(({ x, y, radius, ...source }) => {
    return {
      x: `${x}%`,
      y: `${y}%`,
      radius: `${radius}%`,
      ...source,
    };
  });

export const getDataset = <T = object>(
  datasets: Array<T>,
  selectedId?: string
): T => {
  let dataset;

  if (selectedId) {
    dataset = datasets.find((d: T) => {
      if (!!d && typeof d === "object") {
        const { id = null } = { ...d };

        return id === selectedId;
      }

      return false;
    });
  } else {
    dataset = sample(datasets);
  }

  if (!dataset) {
    return datasets[0];
  }

  return dataset;
};
