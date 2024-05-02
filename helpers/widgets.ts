import { Alert } from "@/lib/api/hooks/useAlerts";

export const combineAlertsAndImages = (
  alerts: Array<Alert | any>,
  images: Array<any>
) => {
  const size = 1000;

  return {
    alerts: alerts.map((alert, i) => {
      const {
        url: { directUrlPreview },
      } = images[i];

      const urlWithoutConstraint = directUrlPreview.slice(0, -3);

      return {
        ...alert,
        ...alert,
        image: {
          width: size,
          height: size,
          url: `${urlWithoutConstraint}${size}`,
        },
      };
    }),
    size,
  };
};
