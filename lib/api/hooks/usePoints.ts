import fetcher from "@/lib/api/fetcher";
import useSWR from "swr";

const usePoints = (url?: string) => {
  return useSWR<Array<{ x: number; y: number; id: number }>>(
    url ? `/api/asset?url=${url}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};

export default usePoints;
