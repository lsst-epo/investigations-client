import { FunctionComponent } from "react";
import FilterTool from "@rubin-epo/epo-widget-lib/FilterTool";
import { SimpleWidgetProps } from "..";

const FilterToolContainer: FunctionComponent<SimpleWidgetProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
}) => {
  return (
    <FilterTool
      selectedColor={value as any}
      selectionCallback={onChangeCallback}
      {...{ id, isDisabled }}
    />
  );
};

FilterToolContainer.displayName = "Questions.Simple.Widget.FilterTool";

export default FilterToolContainer;
