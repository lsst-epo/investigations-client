import { FunctionComponent, ComponentType } from "react";
import Table, { TableHeader, TableRow } from "@/components/layout/Table/Table";
import { Option } from "@/components/shapes/option";
import { BaseQuestionProps, TabularQuestionType } from "@/types/questions";
import Text from "./Text";
import Select from "./Select";
import QuestionNumber from "../QuestionNumber";

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
  isDisabled,
  header = [],
  rowHeader = [],
  questionRows = [],
}) => {
  const onChangeCallback = (value, id) => {
    console.info(value, id);
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
    <QuestionNumber id={id}>
      <Table id={id} {...{ header, rows }} />
    </QuestionNumber>
  );
};

TabularQuestion.displayName = "Questions.Tabular";

export default TabularQuestion;
