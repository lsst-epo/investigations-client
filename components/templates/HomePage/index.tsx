import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment HomepageTemplate on homepage_homepage_Entry {
    __typename
    id
    title
    contentBlocks: homepageContentBlocks {
      __typename
      ... on homepageContentBlocks_text_BlockType {
        id
        text
      }
      ... on homepageContentBlocks_image_BlockType {
        id
        caption
        layout
        image {
          url {
            directUrlPreview
            directUrlOriginal
            PNG
            HighJPG
            LowJPG
            preview
          }
          width
          height
          metadata: additional {
            AltTextEN
            AltTextES
            CaptionEN
            CaptionES
            Credit
          }
        }
      }
      ...InvestigationGridBlock
    }
  }
`);

export default function HomePage(props: {
  data: FragmentType<typeof Fragment>;
  site: string;
  children?: React.ReactNode;
}) {
  const data = useFragment(Fragment, props.data);

  if (!data) return null;

  return (
    <Styled.PageContainer paddingSize="none" width="narrow">
      <Styled.Title>{data.title}</Styled.Title>
      {data.contentBlocks?.map(
        (block, i) =>
          block && <ContentBlockFactory key={i} site={data.site} data={block} />
      )}
      {props.children}
    </Styled.PageContainer>
  );
}

HomePage.displayName = "Template.HomePage";
