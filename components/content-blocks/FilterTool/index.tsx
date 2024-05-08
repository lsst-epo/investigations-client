"use client";
import { FunctionComponent, useState } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import { useTranslation } from "react-i18next";
import FilterTool from "@rubin-epo/epo-widget-lib/FilterTool";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {
    __typename
    id
    preSelectedColor
    readOnly
    widgetInstructions
  }
`);

const FilterToolBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = ({ data }) => {
  const { t } = useTranslation();
  const {
    preSelectedColor,
    readOnly = false,
    widgetInstructions,
  } = useFragment(Fragment, data);
  const [selectedColor, setSelectedColor] = useState(
    preSelectedColor || "none"
  );

  return (
    <>
      {widgetInstructions && (
        <Styled.WidgetInstructions
          dangerouslySetInnerHTML={{ __html: widgetInstructions }}
        />
      )}
      <Styled.WidgetContainer
        title={t("widgets.filter_tool")}
        instructions={widgetInstructions || undefined}
      >
        <FilterTool
          isDisabled={!!readOnly}
          selectedColor={selectedColor}
          selectionCallback={(selection) => setSelectedColor(selection)}
        />
      </Styled.WidgetContainer>
    </>
  );
};

FilterToolBlock.displayName = "ContentBlock.FilterTool";

export default FilterToolBlock;
