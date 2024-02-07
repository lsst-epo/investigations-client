import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import withModal from "@/components/hoc/withModal/withModal";
import WidgetContainer from "@/components/layout/WidgetContainer";
import ColorFilterTool from "@/components/dynamic/ColorFilterTool";
import { SimpleWidgetProps } from "..";

const Fragment = graphql(`
  fragment ColorFilterToolQuestion on contentBlocks_colorFilterToolBlock_BlockType {
    colorFilterTool {
      ...ColorFilterToolEntry
    }
  }
`);

type ColorFilterToolQuestionProps = Omit<SimpleWidgetProps, "widgetConfig"> &
  BaseContentBlockProps<FragmentType<typeof Fragment>>;

/**
 * This implementation of the Color Filter Tool is for questions placed
 * in interactive content sections. It performs callbacks and saves it's data.
 */
const ColorFilterToolQuestion: FunctionComponent<
  ColorFilterToolQuestionProps
> = ({
  data,
  onChangeCallback,
  value,
  isOpen,
  openModal,
  questionText,
  ...props
}) => {
  const { colorFilterTool } = useFragment(Fragment, data);
  const { id, title, displayName } = colorFilterTool[0];

  return (
    <WidgetContainer
      data-modal-open={isOpen}
      style={{
        "--color-tool-padding": "var(--PADDING_SMALL, 20px)",
        "--widget-container-padding": "var(--color-tool-padding)",
      }}
      title={displayName || title}
      instructions={questionText}
      variant="light"
      fillScreen
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
    </WidgetContainer>
  );
};

ColorFilterToolQuestion.displayName = "Questions.Simple.Widget.ColorFilterTool";

export default withModal(ColorFilterToolQuestion);
