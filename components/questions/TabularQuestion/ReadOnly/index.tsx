"use client";

import { FunctionComponent } from "react";
import isObject from "lodash/isObject";
import type { NumberInput, TextInput, WidgetInput } from "@/types/answers";
import useAnswer from "@/hooks/useAnswer";
import * as Styled from "./styles";

const ReadOnlyCell: FunctionComponent<{ questionId: string; id: string }> = ({
  questionId,
  id,
}) => {
  const { answer } = useAnswer<WidgetInput | TextInput | NumberInput>(
    questionId
  );
  const isTabularChild = isObject(answer);

  const cellValue = isTabularChild ? answer[id] : answer;

  return <Styled.ReadOnly type="text" defaultValue={cellValue} readOnly />;
};

export default ReadOnlyCell;
