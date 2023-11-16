"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import SaveForm from "@/components/answers/SaveForm/SaveForm";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment InvestigationChildPageTemplate on investigations_default_Entry {
    __typename
    id
    title
    contentBlocks {
      ...ContentBlockFactory
    }
    hasSavePoint
  }
`);

const InvestigationChildPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  site: string;
  user?: ReturnType<typeof getUserFromJwt>;
  userStatus?: string;
  children?: React.ReactNode;
}> = ({ site, user, userStatus, ...props }) => {
  const data = useFragment(Fragment, props.data);

  if (!data?.title) return null;

  return (
    <Styled.ContentBlocks paddingSize="none" width="wide">
      <Styled.Title>{data.title}</Styled.Title>
      {data.contentBlocks?.map(
        (block, i) =>
          block && <ContentBlockFactory key={i} site={site} data={block} />
      )}
      {data.hasSavePoint && (
        <SaveForm
          investigationId={data.parent?.id}
          user={user}
          userStatus={userStatus}
        />
      )}
    </Styled.ContentBlocks>
  );
};

InvestigationChildPage.displayName = "Template.InvestigationChildPage";

export default InvestigationChildPage;
