"use client";
import { FunctionComponent, useState } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import { useTranslation } from "react-i18next";
import WidgetContainer from "@/components/layout/WidgetContainer";
import FilterTool from "@rubin-epo/epo-widget-lib/FilterTool";
import withModal from "@/components/hoc/withModal/withModal";
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
> = ({ data, openModal, isOpen }) => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    preSelectedColor = "none",
    readOnly = false,
    widgetInstructions,
  } = useFragment(Fragment, data);
  const [selectedColor, setSelectedColor] = useState(preSelectedColor);

  return (
    <>
      {!isOpen && widgetInstructions && (
        <Styled.WidgetInstructions
          dangerouslySetInnerHTML={{ __html: widgetInstructions }}
        />
      )}
      <WidgetContainer
        title={t("widgets.filter_tool")}
        paddingSize="none"
        instructions={widgetInstructions || undefined}
        {...{ openModal, isOpen }}
      >
        <FilterTool
          isDisabled={readOnly || undefined}
          selectedColor={selectedColor}
          selectionCallback={(selection) => setSelectedColor(selection)}
        />
      </WidgetContainer>
    </>
  );
};

FilterToolBlock.displayName = "ContentBlock.FilterTool";

export default withModal(FilterToolBlock);
