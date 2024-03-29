import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
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
    parent {
      id
    }
  }
`);

const InvestigationChildPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  site: string;
  locale: string;
  user?: ReturnType<typeof getUserFromJwt>;
  userStatus?: string;
  children?: React.ReactNode;
}> = ({ site, user, userStatus, locale, ...props }) => {
  const data = useFragment(Fragment, props.data);

  if (!data?.title) return null;

  return (
    <Styled.PageContainer paddingSize="none" width="regular">
      <Styled.Title>{data.title}</Styled.Title>
      {data.contentBlocks?.map(
        (block, i) =>
          block && (
            <ContentBlockFactory
              key={i}
              site={site}
              locale={locale}
              data={block}
            />
          )
      )}
      {data.hasSavePoint && (
        <SaveForm
          investigationId={data.parent?.id}
          user={user}
          userStatus={userStatus}
        />
      )}
    </Styled.PageContainer>
  );
};

InvestigationChildPage.displayName = "Template.InvestigationChildPage";

export default InvestigationChildPage;
