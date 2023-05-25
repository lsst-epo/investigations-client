import Header from "@/components/page/Header/Header";
import { PropsWithChildren } from "react";
import { RootLayoutParams } from "../layout";

interface UriSegmentsParams {
  uriSegments: string[];
}

export interface UriSegmentsProps {
  params: RootLayoutParams & UriSegmentsParams;
  previewData: any;
}

const UriLayout: (
  props: PropsWithChildren<UriSegmentsProps>
) => Promise<JSX.Element> = async ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default UriLayout;
