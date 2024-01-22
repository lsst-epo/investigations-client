"use client";
import { FunctionComponent, useContext } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import withModal from "@/components/hoc/withModal/withModal";
import ColorFilterDisplay from "@/components/dynamic/ColorFilterDisplay";
import { BaseContentBlockProps } from "@/components/shapes";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";

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
    <Styled.ColorToolContainer
      {...{ openModal, isOpen }}
      style={{ "--widget-container-padding": "var(--color-tool-padding)" }}
      data-modal-open={isOpen}
      bgColor="gray"
      caption={t("widgets.color_filter_tool.read_only_caption", { name })}
      title={displayName || title}
    >
      <ColorFilterDisplay {...props} data={colorFilterTool[0]} value={value} />
    </Styled.ColorToolContainer>
  );
};

ColorFilterToolBlock.displayName = "ContentBlock.ColorFilterTool";

export default withModal(ColorFilterToolBlock);
