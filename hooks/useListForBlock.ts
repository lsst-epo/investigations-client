import { useRouter } from "next/router";
import { useDataList } from "@/api/datalist";
import { UseListProps } from "./useList";

// This version does not use the query string for filtering
const useListForBlock = ({
  excludeId = null,
  limit = 5,
  listTypeId = null,
  section,
}: Omit<UseListProps, "isSitewideSearch">) => {
  const { locale } = useRouter();

  const results = useDataList({
    excludeId,
    limit,
    listTypeId,
    site: locale === "en" ? "default" : locale,
    section,
  });

  return results;
};

export default useListForBlock;
