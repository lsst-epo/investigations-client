import { RootLayoutParams } from "./layout";
import { getEntryDataByUri } from "@/api/entry";
import HomePageTemplate from "@/templates/HomePage";

const CRAFT_HOMEPAGE_URI = "__home__";

interface HomePageProps {
  params: RootLayoutParams;
  previewData: any;
}

async function getEntryData(uri: string, site: string, previewToken: any) {
  return await getEntryDataByUri(uri, site, previewToken);
}

export const revalidate = 60;

const HomePage: (props: HomePageProps) => Promise<JSX.Element> = async ({
  params: { locale },
  previewData,
}) => {
  const site = locale === "en" ? "default" : locale;

  const entryData = await getEntryData(
    CRAFT_HOMEPAGE_URI,
    site,
    previewData?.previewToken
  );

  return <HomePageTemplate data={entryData} />;
};

export default HomePage;
