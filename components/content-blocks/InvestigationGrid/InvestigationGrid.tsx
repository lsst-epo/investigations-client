import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { Grid, Image } from "@rubin-epo/epo-react-lib";
import { imageShaper } from "@/helpers";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment InvestigationGridBlock on homepageContentBlocks_investigationGrid_BlockType {
    heading: contentHeading
    investigations: investigationEntries {
      ... on investigations_investigationParent_Entry {
        id
        title
        rawImage: image {
          url {
            directUrlPreview
            directUrlOriginal
            PNG
            HighJPG
            LowJPG
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
        url
      }
    }
  }
`);

interface InvestigationGridProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
  site: string;
}

const InvestigationGrid: FunctionComponent<InvestigationGridProps> = ({
  data,
  site,
}) => {
  const { heading, investigations } = useFragment(Fragment, data);
  if (investigations?.length <= 0) return null;

  return (
    <Styled.Container className="content-block">
      {heading && <h2>{heading}</h2>}
      <Grid columns={3} tablet={3}>
        {investigations.map(
          ({
            id,
            title,
            rawImage,
            url,
            isInactive = false,
            status = "active",
          }) => {
            const image =
              rawImage?.length > 0 ? imageShaper(site, rawImage[0]) : null;

            return (
              <li key={id}>
                <Styled.MixedLink
                  aria-disabled={isInactive}
                  url={url}
                >
                  <Styled.ImageWrapper>
                    {image && <Image image={image} role="presentation" />}
                  </Styled.ImageWrapper>
                  {title && (
                    <Styled.Title id={id}>
                      <span>
                        {title}
                        {isInactive && (
                          <div>{t("investigation.coming_soon")}</div>
                        )}
                      </span>
                    </Styled.Title>
                  )}
                  {status === "earlyAccess" && <Styled.EarlyAccessFlag />}
                </Styled.MixedLink>
              </li>
            );
          }
        )}
      </Grid>
    </Styled.Container>
  );
};

export default InvestigationGrid;
