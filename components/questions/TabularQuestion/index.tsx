import { FunctionComponent, ComponentType } from "react";
import Table, { TableHeader, TableRow } from "@/components/layout/Table/Table";
import { Option } from "@/components/shapes/option";
import {
  BaseQuestionProps,
  TabularQuestionType,
} from "@/components/shapes/questions";
import Text from "./Text";
import Select from "./Select";

interface QuestionCell {
  id: string;
  type: TabularQuestionType;
  value?: string;
}
export type TextCell = QuestionCell;
export interface SelectCell extends QuestionCell {
  options: Option[];
}

interface TabularQuestionProps extends BaseQuestionProps {
  header: TableHeader;
  rowHeader: string[];
  questionRows: Array<TextCell & SelectCell>[];
}

const INPUT_MAP: Record<TabularQuestionType, ComponentType<any>> = {
  text: Text,
  select: Select,
};

const TabularQuestion: FunctionComponent<TabularQuestionProps> = ({
  id,
  number,
  isDisabled,
  header = [],
  rowHeader = [],
  questionRows = [],
}) => {
  const onChangeCallback = (value, id) => {
    console.log(value, id);
  };

  const rows: TableRow = [];

  rowHeader.forEach((text) => {
    rows.push([{ isHeader: true, children: text }]);
  });

  questionRows.forEach((questions, i) => {
    questions.forEach(({ id, type, value, options = [] }) => {
      const Input = INPUT_MAP[type];

      if (!Input) {
        console.error(`"${type}" is not a valid input for this question type.`);

        return null;
      }

      rows[i].push({
        children: (
          <Input {...{ id, isDisabled, onChangeCallback, options, value }} />
        ),
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
