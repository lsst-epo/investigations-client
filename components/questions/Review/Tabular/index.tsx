import { WidgetInput } from "@/types/answers";
import { BaseReviewProps } from "@/types/questions";
import { FunctionComponent } from "react";
import {
  Cell,
  buildHeader,
  buildRows,
} from "@/components/layout/Table/helpers";
import * as Styled from "../styles";

interface TabularReviewProps extends BaseReviewProps<WidgetInput> {
  questionText: string;
  rows: Array<{ cells: Array<Cell>; previousQuestion: Array<any> }>;
}

const TabularReview: FunctionComponent<TabularReviewProps> = ({
  id,
  value,
  number,
  questionText,
  rows = [],
}) => {
  const { cells: headerCells } = rows.shift() || {};
  const header = buildHeader(headerCells);
  const parsedRows = buildRows(rows, id, true);

  return (
    <Styled.ReviewListItem value={number}>
      {questionText}
      {/* <Table rows={parsedRows} {...{ header }} /> */}
    </Styled.ReviewListItem>
  );
};

TabularReview.displayName = "Review.Tabular";

export default TabularReview;
