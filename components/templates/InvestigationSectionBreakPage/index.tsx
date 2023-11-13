"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { useTranslation } from "react-i18next";
import Container from "@rubin-epo/epo-react-lib/Container";
import Image from "next/image";
import { TextContent } from "@/components/content-blocks/Text/styles";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment InvestigationSectionBreakTemplate on investigations_investigationSectionBreakChild_Entry {
    __typename
    id
    title
    text
    prev(section: "investigations") {
      __typename
      uri
    }
    next(section: "investigations") {
      __typename
      uri
    }
  }
`);

const InvestigationSectionBreakPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const data = useFragment(Fragment, props.data);

  if (!data.title) return null;

  const { text, next } = data;
  const srcs: Record<string, { src: string; alt: string }> = {
    break: {
      src: "/assets/section_break/section_break_celebration.gif",
      alt: t("section_break.congratulations_alt"),
    },
    final_en: {
      src: "/assets/section_break/section_break_final_en.gif",
      alt: t("section_break.finish_alt"),
    },
    final_es: {
      src: "/assets/section_break/section_break_final_es.gif",
      alt: t("section_break.finish_alt"),
    },
  };
  const isFinalPage = !next;
  const imgSrc = srcs[isFinalPage ? `final_${language}` : "break"];

  return (
    <Container>
      <Image {...imgSrc} width={1260} height={560} />
      <Styled.SectionBreakTitle>
        {t(
          isFinalPage ? "section_break.finish" : "section_break.congratulations"
        )}
      </Styled.SectionBreakTitle>
      {text && <TextContent dangerouslySetInnerHTML={{ __html: text }} />}
    </Container>
  );
};

export default InvestigationSectionBreakPage;
