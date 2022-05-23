import useSWR from "swr";
import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { pageFragment } from "@/lib/api/fragments/page";
import { investigationsPageFragment } from "@/lib/api/fragments/investigations";

export async function getAllEntries() {
  const query = gql`
    {
      entries(site: "*", section: ["pages", "homepage", "investigations"]) {
        uri
      }
    }
  `;
  const data = await queryAPI(query);
  return data.entries
    .filter(({ uri }) => uri != null)
    .map(({ uri, sectionHandle }) => ({
      params: { uriSegments: uri.split("/"), uri, sectionHandle },
    }));
}

export async function getEntrySectionByUri(uri = "__home__", site = "default") {
  const query = gql`
    {
      entry (uri: "${uri}", site: "${site}") {
        sectionHandle
      }
    }
  `;
  const data = await queryAPI(query);
  return data.entry?.sectionHandle;
}

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
    case "investigations":
      theSection = `"investigations"`;
      theOrderBy = `"dateCreated desc"`;
      break;
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
      ${investigationsPageFragment}
      {
        entries (id: ["not", ${excludeId}], section: ${theSection}, 
          site: "${site}", relatedTo: ${listTypeId}, limit: ${limit}, 
          offset: ${offset}, orderBy: ${theOrderBy}, inReverse: ${inReverse}, 
          search: ${search}) {
          ...pageFragment
          ...investigationsPageFragment
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
