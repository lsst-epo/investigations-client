/* eslint-disable camelcase */
import fetcher from "@/lib/api/fetcher";
import useSWR from "swr";

export interface Alert {
  id: number;
  error: number;
  date: number;
  magnitude: number;
}

export interface LegacyAlert {
  alert_id: number;
  error: number;
  date: number;
  magnitude: number;
  image_id: number;
}

export interface LegacySource {
  name: string;
  band: string;
  alerts: Array<LegacyAlert>;
}

const fetchAndParseAlerts = async (url: string): Promise<Array<Alert>> => {
  const data = await fetcher<Array<Alert> | Array<LegacyAlert> | LegacySource>(
    url
  );

  const isLegacyAlert = (alert: LegacyAlert | Alert): alert is LegacyAlert =>
    Object.hasOwn(alert, "alert_id");

  const mapLegacyAlert = (alert: LegacyAlert | Alert): Alert => {
    if (isLegacyAlert(alert)) {
      const { alert_id: id, ...props } = alert;

      return { id, ...props };
    } else {
      return alert as Alert;
    }
  };

  if (Array.isArray(data)) {
    return data.map(mapLegacyAlert);
  } else {
    const { alerts } = data;

    return alerts.map(mapLegacyAlert);
  }
};

const useAlerts = (url?: string) => {
  return useSWR<Array<Alert>>(
    url ? `/api/asset?url=${url}` : null,
    fetchAndParseAlerts,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};

export default useAlerts;
