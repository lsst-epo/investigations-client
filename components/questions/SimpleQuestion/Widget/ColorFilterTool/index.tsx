import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import withModal from "@/components/hoc/withModal/withModal";
import ColorFilterTool from "@/components/containers/ColorFilterTool";
import { SimpleWidgetProps } from "..";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment ColorFilterToolQuestion on contentBlocks_colorFilterToolBlock_BlockType {
    colorFilterTool {
      ...ColorFilterToolEntry
    }
  }
`);

interface ColorFilterToolQuestionProps
  extends Pick<
      SimpleWidgetProps,
      "id" | "isDisabled" | "onChangeCallback" | "value"
    >,
    BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

/**
 * This implementation of the Color Filter Tool is for questions placed
 * in interactive content sections. It performs callbacks and saves it's data.
 */
const ColorFilterToolQuestion: FunctionComponent<
  ColorFilterToolQuestionProps
> = ({ data, onChangeCallback, value, isOpen, openModal, ...props }) => {
  const { colorFilterTool } = useFragment(Fragment, data);
  const { id, title, displayName } = colorFilterTool[0];

  return (
    <Styled.ColorToolContainer
      data-modal-open={isOpen}
      style={{ "--widget-container-padding": "var(--color-tool-padding)" }}
      title={displayName || title}
      {...{ openModal, isOpen }}
    >
      <ColorFilterTool
        {...props}
        onChangeCallback={(value) =>
          onChangeCallback && onChangeCallback({ [id]: value })
        }
        value={value?.[id]}
        data={colorFilterTool[0]}
      />
    </Styled.ColorToolContainer>
  );
};

ColorFilterToolQuestion.displayName = "Questions.Simple.Widget.ColorFilterTool";

export default withModal(ColorFilterToolQuestion);
