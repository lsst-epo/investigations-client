"use client";
import { FunctionComponent, useState } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import { useTranslation } from "react-i18next";
import WidgetContainer from "@/components/layout/WidgetContainer";
import FilterTool from "@rubin-epo/epo-widget-lib/FilterTool";
import withModal from "@/components/hoc/withModal/withModal";

const Fragment = graphql(`
  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {
    __typename
    id
    preSelectedColor
    readOnly
  }
`);

interface FilterToolBlockProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

const FilterToolBlock: FunctionComponent<FilterToolBlockProps> = ({
  data,
  openModal,
  isOpen,
}) => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { preSelectedColor = "none", readOnly = false } = useFragment(
    Fragment,
    data
  );
  const [selectedColor, setSelectedColor] = useState(preSelectedColor);

  return (
    <WidgetContainer
      title={t("widgets.filter_tool")}
      paddingSize="none"
      {...{ openModal, isOpen }}
    >
      <FilterTool
        isDisabled={readOnly}
        selectedColor={selectedColor}
        selectionCallback={(selection) => setSelectedColor(selection)}
      />
    </WidgetContainer>
  );
};

FilterToolBlock.displayName = "ContentBlock.FilterTool";

export default withModal(FilterToolBlock);
