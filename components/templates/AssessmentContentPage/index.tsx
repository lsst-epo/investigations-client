import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import * as Styled from "./styles";
import CloseWindow from "@/components/molecules/buttons/CloseWindow";

const Fragment = graphql(`
  fragment AssessmentContentTemplate on assessments_default_Entry {
    __typename
    title
    id
    contentBlocks {
      __typename
      ...ContentBlockFactory
    }
  }
`);

const AssessmentContentPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  site: string;
  locale: string;
}> = ({ site, locale, ...props }) => {
  const data = useFragment(Fragment, props.data);
  const { title, id } = data;

  return (
    <Styled.PageContainer paddingSize="none">
      <Styled.Header>
        <Styled.Title>{title}</Styled.Title>
        <CloseWindow />
      </Styled.Header>
      {data.contentBlocks?.map(
        (block, i) =>
          block && (
            <ContentBlockFactory
              key={i}
              site={site}
              data={block}
              pageId={id || undefined}
              // isOpen={false}
              // hasModal={false}
              locale={locale}
            />
          ),
      )}
    </Styled.PageContainer>
  );
};

export default AssessmentContentPage;
