import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import useSWR from "swr";
import { pageFragment } from "@/lib/api/fragments/page";

export function useDataList({
  excludeId = null,
  inReverse = false,
  limit = null,
  listTypeId = null,
  offset = null,
  search = null,
  section = "pages",
  site = "default",
}) {
  let theSection;
  let theOrderBy;

  switch (section) {
    case "pages":
      theSection = `"pages"`;
      theOrderBy = `"dateCreated desc"`;
      break;
    default:
      theSection = null; // find a way to pass just news and pages
      theOrderBy = `"dateUpdated desc"`;
  }

  const query =
    limit === 0
      ? null
      : gql`
      ${pageFragment}
      {
        entries (id: ["not", ${excludeId}], section: ${theSection}, 
          site: "${site}", relatedTo: ${listTypeId}, limit: ${limit}, 
          offset: ${offset}, orderBy: ${theOrderBy}, inReverse: ${inReverse}, 
          search: ${search}) {
          ...pageFragment
        }
        total: entryCount(id: ["not", ${excludeId}], section: ${theSection}, 
          site: "${site}", relatedTo: ${listTypeId}, limit: ${limit}, 
          offset: ${offset}, orderBy: ${theOrderBy}, inReverse: ${inReverse},
          search: ${search})
      }
    `;

  const { data, error } = useSWR(query, queryAPI);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
