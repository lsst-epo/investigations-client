import { FunctionComponent, PropsWithChildren } from "react";
import { RootLayoutParams } from "../../layout";
import { InvestigationParams } from "../layout";
import { ProgressProvider } from "@/contexts/Progress";
import Header from "@/page/Header/Header";
import Pager from "@/page/Pager";

export interface ReviewPageProps {
  params: RootLayoutParams & InvestigationParams;
}

const ReviewLayout: FunctionComponent<PropsWithChildren<ReviewPageProps>> = ({
  children,
}) => {
  return (
    <ProgressProvider currentPageId="review">
      <Header />
      {children}
      <Pager />
    </ProgressProvider>
  );
};

export default ReviewLayout;
