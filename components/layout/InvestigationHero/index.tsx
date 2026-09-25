"use client";
import { useTranslation } from "react-i18next";
import { Button, Image, IconComposer } from "@rubin-epo/epo-react-lib";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { imageShaper } from "@/helpers";
import * as Styled from "./styles";
import Container from "@rubin-epo/epo-react-lib/Container";

const Fragment = graphql(`
  fragment InvestigationHero on investigations_investigationParent_Entry {
    slug
    title
    status
    educatorResourcesLink: mixedLink {
      type
      url
      text
      customText
      ariaLabel
      target
      element {
        uri
      }
    }
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

  const {
    title,
    status,
    image: rawImage,
    children,
    educatorResourcesLink,
  } = investigation;
  const image = rawImage?.[0] && imageShaper(site, rawImage[0]);
  const firstPage = children?.[0]?.uri;

  return (
    <Container width="regular" bgColor="orange05" paddingSize="medium">
      <Styled.Inner style={duration ? { "--duration-width": "197px" } : {}}>
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
            {educatorResourcesLink?.url && (
              <Button as="a" href={educatorResourcesLink.url} target="_blank">
                {educatorResourcesLink.customText ||
                  t("investigation.go_to_teacher_resources")}
              </Button>
            )}
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
