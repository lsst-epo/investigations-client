import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import StepNavigation, { StepNavigationProps } from "../StepNavigation";

const Fragment = graphql(`
  fragment GuideNavigationPage on EntryInterface {
    uri
    title
  }
`);

interface GuideNavigationProps
  extends Omit<StepNavigationProps, "pages" | "columns" | "expandable"> {
  pages?: Array<FragmentType<typeof Fragment>>;
}

export default function GuideNavigation({
  pages,
  ...props
}: GuideNavigationProps) {
  const pagesData = useFragment(Fragment, pages);

  if (!pagesData?.length) return null;

  const mappedPages = pagesData.map((page) => {
    return {
      url: page.uri || "",
      title: page.title || "",
    };
  });

  return (
    <StepNavigation pages={mappedPages} columns={2} expandable {...props} />
  );
}
