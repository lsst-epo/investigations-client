import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import * as Styled from "./styles";
import Hero from "@/components/page/Hero";

const Fragment = graphql(`
  fragment HomepageTemplate on homepage_homepage_Entry {
    __typename
    id
    title
    image {
      url {
        directUrlOriginal
      }
      width
      height
    }
    text
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
    <div>
      <Styled.PageContainer paddingSize="none" width="narrow" bgColor="#fff9f2">
        <Hero heroText={data.text}></Hero>
        {data.contentBlocks?.map(
          (block, i) =>
            block && (
              <ContentBlockFactory key={i} site={data.site} data={block} />
            )
        )}
        {props.children}
      </Styled.PageContainer>
    </div>
  );
}

HomePage.displayName = "Template.HomePage";
