import { Alert } from "@/lib/api/hooks/useAlerts";
import { resizeCantoImage } from "./assets";

export const combineAlertsAndImages = (
  alerts: Array<Alert | any>,
  images: Array<any>
) => {
  const size = 240;

  return {
    alerts: alerts.map((alert, i) => {
      const {
        url: { directUrlPreview },
      } = images[i];

      return {
        ...alert,
        ...alert,
        image: {
          width: size,
          height: size,
          url: resizeCantoImage(directUrlPreview, size),
        },
      };
    }),
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
