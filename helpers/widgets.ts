import { Alert } from "@/lib/api/hooks/useAlerts";

export const combineAlertsAndImages = (
  alerts: Array<Alert | any>,
  images: Array<any>
) => {
  const size = 200;

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
          url: directUrlPreview,
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
