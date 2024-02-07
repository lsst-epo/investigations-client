import { FunctionComponent, Suspense } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { SimpleWidgetProps } from "..";
import { BaseContentBlockProps } from "@/components/shapes";
import { MultiselectInput } from "@/types/answers";
import WidgetContainer from "@/components/layout/WidgetContainer";
import SourceSelectorContainer from "@/components/dynamic/SourceSelector";
import withModal from "@/components/hoc/withModal/withModal";
import * as Styled from "./styles";
import Loader from "@/components/page/Loader";

const Fragment = graphql(`
  fragment SourceSelectorQuestion on questionWidgetsBlock_sourceSelectorBlock_BlockType {
    __typename
    sourceSelector {
      ...SourceSelectorEntry
    }
  }
`);

type SourceSelectorQuestionProps = Omit<
  SimpleWidgetProps<MultiselectInput>,
  "widgetConfig"
> &
  BaseContentBlockProps<FragmentType<typeof Fragment>>;

const SourceSelectorQuestion: FunctionComponent<
  SourceSelectorQuestionProps
> = ({
  data,
  onChangeCallback,
  value = [],
  isOpen,
  openModal,
  questionText,
}) => {
  const { sourceSelector } = useFragment(Fragment, data);

  const handleRemoveSource = (id: string) => {
    if (value.includes(id)) {
      onChangeCallback && onChangeCallback(value.filter((v) => v !== id));
    }
  };

  if (
    sourceSelector.length === 0 ||
    sourceSelector[0] === null ||
    sourceSelector[0].__typename !== "widgets_sourceSelector_Entry"
  )
    return null;

  const { title, displayName, dataset } = sourceSelector[0];
  const { sources } = dataset[0];

  const selectedSources: Array<{ type: string; id: string }> = sources
    .filter(({ id }) => value.includes(id))
    .map(({ id, type }) => {
      return { id, type };
    });

  return (
    <>
      <WidgetContainer
        data-modal-open={isOpen}
        title={displayName || title || undefined}
        interactive={false}
        instructions={questionText}
        {...{ openModal, isOpen }}
      >
        <Suspense fallback={<Loader />}>
          <SourceSelectorContainer
            data={sourceSelector[0]}
            onChangeCallback={(value) =>
              onChangeCallback && onChangeCallback(value)
            }
            value={value}
            showControls={isOpen}
          />
        </Suspense>
      </WidgetContainer>
      {!isOpen && (
        <Styled.SelectionList
          sources={selectedSources}
          onRemoveCallback={handleRemoveSource}
        />
      )}
    </>
  );
};

SourceSelectorQuestion.displayName = "Questions.Simple.Widget.SourceSelector";

export default withModal(SourceSelectorQuestion);
