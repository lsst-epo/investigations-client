import fetcher from "@/lib/api/fetcher";
import useSWR from "swr";

const useIsochrones = (url?: string) => {
  return useSWR<{ ages: Record<string, Array<{ x: number; y: number }>> }>(
    url ? `/api/asset?url=${url}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};

export default useIsochrones;
