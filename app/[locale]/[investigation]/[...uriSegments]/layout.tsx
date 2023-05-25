import { PropsWithChildren } from "react";
import { InvestigationParams } from "../layout";
import { RootLayoutParams } from "../../layout";
import Header from "@/components/page/Header/Header";
import Body from "@/global/Body";
interface UriSegmentsParams {
  uriSegments: string[];
}

export interface UriSegmentsProps {
  params: RootLayoutParams & UriSegmentsParams & InvestigationParams;
  previewData: any;
}

const UriLayout: (
  props: PropsWithChildren<UriSegmentsProps>
) => Promise<JSX.Element> = async ({ children }) => {
  return (
    <Body>
      <Header />
      {children}
    </Body>
  );
};

export default UriLayout;
