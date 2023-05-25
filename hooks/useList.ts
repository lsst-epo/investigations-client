import { useDataList } from "@/api/datalist";
import { getCategoryObject } from "@/helpers";
import { useGlobalData } from "@/hooks";
import { useRouter } from "next/router";

export interface UseListProps {
  excludeId?: any;
  isSitewideSearch?: boolean;
  limit?: number;
  listTypeId?: any;
  section: string;
}

const useList = ({
  excludeId = null,
  isSitewideSearch = false,
  limit = 10,
  listTypeId = null,
  section,
}: UseListProps) => {
  const { query, locale } = useRouter();

  const { page, filter } = query;
  const pageNumber = parseInt(page as string);

  const offset = pageNumber * limit - limit || null;
  const inReverse = query.sort === "descending";
  const search = query.search ? `"${query.search}"` : null;
  const categories = useGlobalData("categories");
  // if the search is sitewide (like '/search' is), our list will filter by section instead of listTypeId
  if (isSitewideSearch && query.filter) {
    const curr = getCategoryObject(categories, query.filter);
    section = curr.slug.replace(/-([a-z])/g, (x: string, up: string) =>
      up.toUpperCase()
    ); // make camelCase
  } else if (!isSitewideSearch) {
    listTypeId = parseInt(filter as string) || listTypeId;
  }

  const results = useDataList({
    excludeId,
    inReverse,
    limit,
    offset,
    search,
    site: locale === "en" ? "default" : locale,
    listTypeId,
    section,
  });
  // let's just keep all the data numbers together!
  if (results?.data) {
    results.data.currentCategory = listTypeId;
    results.data.offset = offset;
    results.data.limit = limit;
    results.data.page = pageNumber || 1;
  }

  return results;
};

export default useList;
