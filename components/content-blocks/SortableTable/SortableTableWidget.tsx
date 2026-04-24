import { FunctionComponent, use } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { FragmentType, useFragment } from "@/gql/public-schema";
import { SortableTable } from "@rubin-epo/epo-widget-lib/SortableTable";
import { SortableTableWidgetFragmentDoc } from "@/gql/public-schema/graphql";

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

const SortableTableWidget: FunctionComponent<BaseContentBlockProps<FragmentType<typeof SortableTableWidgetFragmentDoc>>> = ({data}) => {
  const { sortableTableWidget } = useFragment(SortableTableWidgetFragmentDoc, data);
  const url = sortableTableWidget[0]?.dataset[0]?.json[0]?.url;

  const {tableData} = use(getDataset(url));

  return <SortableTable tableData={tableData} />;
};

export default SortableTableWidget;