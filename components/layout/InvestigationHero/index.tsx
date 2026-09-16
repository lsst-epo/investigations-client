"use client";
import { useTranslation } from "react-i18next";
import { Button, Image, IconComposer } from "@rubin-epo/epo-react-lib";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { imageShaper } from "@/helpers";
import * as Styled from "./styles";
import Container from "@rubin-epo/epo-react-lib/Container";

const Fragment = graphql(`
  fragment InvestigationHero on investigations_investigationParent_Entry {
    title
    status
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
    children {
      uri
    }
  }
`);

interface InvestigationHeroProps {
  data?: FragmentType<typeof Fragment>;
  site?: string;
  duration?: string;
}

export default function InvestigationHero({
  data,
  site,
  duration,
}: InvestigationHeroProps) {
  const { t } = useTranslation();
  const investigation = useFragment(Fragment, data);

  if (!investigation) return null;

  const { title, status, image: rawImage, children } = investigation;
  const image = rawImage?.[0] && imageShaper(site, rawImage[0]);
  const firstPage = children?.[0]?.uri;

  return (
    <Container width="regular" bgColor="orange05" paddingSize="medium">
      <Styled.Inner>
        {image && (
          <Styled.Image>
            <Image image={image} />
          </Styled.Image>
        )}
        <Styled.Text>
          <h1>{title}</h1>
        </Styled.Text>
        {firstPage && (
          <Styled.ButtonWrapper>
            <Button styleAs="educator" as="a" href={`/${firstPage}`}>
              {t("investigation.start")}
            </Button>
          </Styled.ButtonWrapper>
        )}
        {duration && (
          <Styled.Duration>
            <IconComposer icon="Timer" />
            <Styled.DurationText>
              {t("investigation.total_duration")}
            </Styled.DurationText>
            <Styled.DurationTime>{duration}</Styled.DurationTime>
          </Styled.Duration>
        )}
        {status === "earlyAccess" && <Styled.EarlyAccessFlag />}
      </Styled.Inner>
    </Container>
  );
}
