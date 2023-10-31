"use client";
import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment ReferenceContentTemplate on referenceModals_default_Entry {
    __typename
    title
    id
    contentBlocks {
      ...ContentBlockFactory
    }
  }
`);

const ReferenceContentPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  site: string;
}> = ({ site, ...props }) => {
  const data = useFragment(Fragment, props.data);
  const { title, id } = data;

  return (
    <Styled.ContentBlocks paddingSize="medium">
      <Styled.Title>{title}</Styled.Title>
      {data.contentBlocks?.map(
        (block, i) =>
          block && (
            <ContentBlockFactory key={i} site={site} data={block} pageId={id} />
          )
      )}
    </Styled.ContentBlocks>
  );
};

export default ReferenceContentPage;
