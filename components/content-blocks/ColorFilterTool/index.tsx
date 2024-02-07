"use client";
import { FunctionComponent, useContext } from "react";
import { useTranslation } from "react-i18next";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import withModal from "@/components/hoc/withModal/withModal";
import { BaseContentBlockProps } from "@/components/shapes";
import ColorFilterDisplay from "@/components/dynamic/ColorFilterDisplay";
import WidgetContainer from "@/components/layout/WidgetContainer";

const Fragment = graphql(`
  fragment ColorFilterToolBlock on contentBlocks_colorFilterToolBlock_BlockType {
    colorFilterTool {
      ...ColorFilterToolEntry
    }
  }
`);

interface ColorFilterProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

/**
 * This implementation of the ColorFilterTool is designed for read-only displays.
 * It could be used for an interactive example, but those should be confined to
 * questions. This component does not perform answer callbacks.
 */
const ColorFilterToolBlock: FunctionComponent<ColorFilterProps> = ({
  data,
  openModal,
  isOpen,
  ...props
}) => {
  const { t } = useTranslation();
  const { colorFilterTool } = useFragment(Fragment, data);
  const { id, title, displayName } = colorFilterTool[0];
  const { answers } = useContext(StoredAnswersContext);

  const answerId = Object.keys(answers).find((key: string) => {
    if (answers[key]) {
      const { data } = answers[key];

      return Object.prototype.hasOwnProperty.call(data, id);
    }
  });

  const value = answers[answerId]?.data[id];
  const { name = "" } = value || {};
  return (
    <WidgetContainer
      {...{ openModal, isOpen }}
      style={{
        "--color-tool-padding": "var(--PADDING_SMALL, 20px)",
        "--widget-container-padding": "var(--color-tool-padding)",
        "--widget-content-width": "1200px",
      }}
      data-modal-open={isOpen}
      interactive={false}
      variant="light"
      caption={t("widgets.color_filter_tool.read_only_caption", { name })}
      title={displayName || title}
    >
      <ColorFilterDisplay {...props} data={colorFilterTool[0]} value={value} />
    </WidgetContainer>
  );
};

ColorFilterToolBlock.displayName = "ContentBlock.ColorFilterTool";

export default withModal(ColorFilterToolBlock);
