"use client";
import { FunctionComponent } from "react";
import isNull from "lodash/isNull";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import ColorFilterTool from "@/components/dynamic/ColorFilterTool";
import { WidgetQuestion } from "..";

const Fragment = graphql(`
  fragment ColorFilterToolQuestion on questionWidgetsBlock_colorFilterToolBlock_BlockType {
    colorFilterTool {
      ...ColorFilterToolEntry
    }
  }
`);

/**
 * This implementation of the Color Filter Tool is for questions placed
 * in interactive content sections. It performs callbacks and saves it's data.
 */
const ColorFilterToolQuestion: FunctionComponent<
  WidgetQuestion<FragmentType<typeof Fragment>>
> = ({ data, onChangeCallback, value, instructions }) => {
  const { colorFilterTool } = useFragment(Fragment, data);

  if (isNull(colorFilterTool) || isNull(colorFilterTool[0])) return null;

  const { id, title, displayName } = colorFilterTool[0];

  return (
    <WidgetContainerWithModal
      title={displayName || title}
      {...{ instructions }}
    >
      <ColorFilterTool
        onChangeCallback={(value) =>
          onChangeCallback && onChangeCallback({ [id]: value })
        }
        value={value?.[id]}
        data={colorFilterTool[0]}
      />
    </WidgetContainerWithModal>
  );
};

ColorFilterToolQuestion.displayName = "Questions.Widget.ColorFilterTool";

export default ColorFilterToolQuestion;
