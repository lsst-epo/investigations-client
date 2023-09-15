import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import * as Templates from "@/components/templates";

export const TEMPLATE_MAP: Record<string, any> = {
  pages_pages_Entry: Templates.Page,
};

export default function TemplateFactory(props: {
  data: FragmentType<typeof Fragment>;
}) {
  const data = useFragment(Fragment, props.data);

  const Template = data?.__typename && TEMPLATE_MAP[data.__typename];

  if (!Template) return null;

  return <Template data={data} />;
}

export const Fragment = graphql(`
  fragment TemplateFactory on EntryInterface {
    __typename
    ...PageTemplate
  }
`);
