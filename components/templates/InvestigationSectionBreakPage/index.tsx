import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { useTranslation } from "@/lib/i18n/server";
import Container from "@rubin-epo/epo-react-lib/Container";
import Button from "@rubin-epo/epo-react-lib/Button";
import Link from "next/link";
import Image from "next/image";
import { TextContent } from "@/components/content-blocks/Text/styles";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment InvestigationSectionBreakTemplate on investigations_investigationSectionBreakChild_Entry {
    __typename
    id
    text
    parent {
      id
    }
    next(section: "investigations", level: 2) {
      __typename
      uri
      parent {
        id
      }
    }
  }
`);

const InvestigationSectionBreakPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  locale: string;
}> = async ({ locale, data }) => {
  const { t } = await useTranslation(locale, "translation");
  const { text, next, parent } = useFragment(Fragment, data);

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
  const isFinalPage = !next || next.parent?.id !== parent?.id;
  const imgSrc = srcs[isFinalPage ? `final_${locale}` : "break"];

  return (
    <Container width="regular">
      <Image {...imgSrc} width={1260} height={560} priority />
      <Styled.SectionBreakTitle>
        {t(
          isFinalPage ? "section_break.finish" : "section_break.congratulations"
        )}
      </Styled.SectionBreakTitle>

      {text && <TextContent dangerouslySetInnerHTML={{ __html: text }} />}
      {isFinalPage && (
        <Styled.ReviewLinkContainer>
          <Button as={Link} href="./review" icon="CheckmarkCircle" prefetch>
            {t("section_break.review")}
          </Button>
        </Styled.ReviewLinkContainer>
      )}
    </Container>
  );
};

export default InvestigationSectionBreakPage;
