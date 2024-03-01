import fetcher from "@/lib/api/fetcher";
import useSWR from "swr";

interface Alert {
  id: number;
  error: number;
  date: number;
  magnitude: number;
}

const useAlerts = (url?: string) => {
  return useSWR<Array<Alert>>(url ? `/api/asset?url=${url}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export default useAlerts;
