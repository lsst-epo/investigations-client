import { FunctionComponent, use } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { graphql, FragmentType, useFragment } from "@/gql/public-schema";
import { SortableTable } from "@rubin-epo/epo-widget-lib/SortableTable";

const Fragment = graphql(`
  fragment SortableTableWidget on contentBlocks_sortableTable_BlockType {
    sortableTableWidget {
      ... on widgets_sortableTable_Entry {
        dataset {
          ... on datasets_sortableTableData_Entry {
            json {
              url
            }
          }
        }
      }
    }
  }
`);

async function getDataset(url: string) {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Unable to fetch data.");
    }

    const dataObj = await response.json();
    return dataObj;

  } catch (error) {
    console.error(error);
  }
}

const SortableTableWidget: FunctionComponent<BaseContentBlockProps<FragmentType<typeof Fragment>>> = ({data}) => {
  const { sortableTableWidget } = useFragment(Fragment, data);
  const url = sortableTableWidget[0]?.dataset[0]?.json[0]?.url;

  const {tableData} = use(getDataset(url));

  return <SortableTable tableData={tableData} />;
};

export default SortableTableWidget;