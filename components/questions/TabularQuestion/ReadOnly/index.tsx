"use client";

import { FunctionComponent } from "react";
import isObject from "lodash/isObject";
import type {
  NumberInput,
  SelectInput,
  TextInput,
  WidgetInput,
} from "@/types/answers";
import useAnswer from "@/hooks/useAnswer";
import * as Styled from "./styles";
import { Option } from "@/components/shapes/option";
import { getLabelByValue } from "@/components/questions/utils";

interface ReadOnlyCellProps {
  questionId: string;
  id: string;
  options?: Array<Option>;
}

const ReadOnlyCell: FunctionComponent<ReadOnlyCellProps> = ({
  questionId,
  options,
  id,
}) => {
  const { answer } = useAnswer<
    WidgetInput | TextInput | NumberInput | SelectInput
  >(questionId);
  const isTabularChild = isObject(answer);

  const cellValue = isTabularChild ? answer[id] : answer;

  return (
    <Styled.ReadOnly
      type="text"
      defaultValue={
        options && options.length > 0
          ? getLabelByValue(options, cellValue)
          : cellValue
      }
      readOnly
    />
  );
};

export default ReadOnlyCell;
