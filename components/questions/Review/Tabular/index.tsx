import { BaseReviewProps } from "@/types/questions";
import { FunctionComponent } from "react";
import Table from "@/components/layout/Table";
import {
  Cell,
  buildHeader,
  buildRows,
} from "@/components/layout/Table/helpers";
import * as Styled from "../styles";

interface TabularReviewProps extends BaseReviewProps {
  questionText: string;
  rows: Array<{ cells: Array<Cell>; previousQuestion: Array<any> }>;
}

const TabularReview: FunctionComponent<TabularReviewProps> = ({
  id,
  number,
  questionText,
  rows = [],
}) => {
  const { cells: headerCells } = rows.shift() || {};
  const header = buildHeader(headerCells);
  const questionOnly = rows.map(({ cells }) => {
    return { cells };
  });
  const parsedRows = buildRows(questionOnly, id, true);

  return (
    <Styled.ReviewListItem value={number}>
      {questionText}
      <Styled.PrintWrapper>
        <Table rows={parsedRows} {...{ header }} />
      </Styled.PrintWrapper>
    </Styled.ReviewListItem>
  );
};

TabularReview.displayName = "Review.Tabular";

export default TabularReview;
