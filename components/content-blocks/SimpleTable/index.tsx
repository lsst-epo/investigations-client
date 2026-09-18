"use client";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import BaseSimpleTable, {
  type SimpleTableRow,
} from "@rubin-epo/epo-react-lib/SimpleTable";
import { BaseContentBlockProps } from "@/components/shapes";
import { checkSitesForLocale } from "../helpers";

const Fragment = graphql(`
  fragment SimpleTableBlock on contentBlocks_simpleTable_BlockType {
    id
    simpleTable {
      ... on simpleTable_tableRow_BlockType {
        __typename
        id
        rowColor
        rowTitle
        rowContent
      }
    }
    sites
  }
`);

interface Props extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

export default function SimpleTable(props: Props) {
  const { simpleTable, sites } = useFragment(Fragment, props.data);

  // Remove nulls from graphql data
  const rows = simpleTable.flatMap<SimpleTableRow>((row) =>
    row?.__typename === "simpleTable_tableRow_BlockType"
      ? {
          rowColor: (row.rowColor ?? "none") as SimpleTableRow["rowColor"],
          rowTitle: row.rowTitle ?? "",
          rowContent: row.rowContent ?? "",
        }
      : [],
  );

  const showTable = checkSitesForLocale(sites, props.locale);

  if (!rows.length || !showTable) return null;

  return <BaseSimpleTable simpleTable={rows} />;
}

SimpleTable.displayName = "ContentBlock.SimpleTable";
