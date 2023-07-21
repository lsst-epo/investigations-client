import { FunctionComponent, ComponentType } from "react";
import Table, { TableHeader, TableRow } from "@/components/layout/Table/Table";
import { Option } from "@/components/shapes/option";
import {
  BaseQuestionProps,
  TabularQuestionType,
} from "@/components/shapes/questions";
import Text from "./Text";

interface QuestionCell {
  id: string;
  type: TabularQuestionType;
}
export type TextCell = QuestionCell;
export interface SelectCell extends QuestionCell {
  options: Option[];
}

interface TabularQuestionProps extends BaseQuestionProps {
  header: TableHeader;
  rowHeader: string[];
  questionRows: Array<TextCell | SelectCell>[];
}

const INPUT_MAP: Record<string, ComponentType<any>> = {
  text: Text,
};

const TabularQuestion: FunctionComponent<TabularQuestionProps> = ({
  id,
  number,
  isDisabled,
  header = [],
  rowHeader = [],
  questionRows = [],
}) => {
  const onChangeCallback = (value) => {
    console.log(value);
  };

  const rows: TableRow = [];

  rowHeader.forEach((text) => {
    rows.push([{ isHeader: true, children: text }]);
  });

  questionRows.forEach((questions, i) => {
    questions.forEach(({ id, type }) => {
      const Input = INPUT_MAP[type];

      rows[i].push({
        children: <Input {...{ id, isDisabled, onChangeCallback }} />,
      });
    });
  });

  return (
    <li value={number}>
      <Table id={id} {...{ header, rows }} />
    </li>
  );
};

TabularQuestion.displayName = "Questions.Tabular";

export default TabularQuestion;
