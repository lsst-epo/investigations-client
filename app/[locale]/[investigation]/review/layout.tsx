import { FunctionComponent, PropsWithChildren } from "react";
import { RootLayoutParams } from "../../layout";
import { InvestigationParams } from "../layout";

export interface ReviewPageProps {
  params: RootLayoutParams & InvestigationParams;
}

const ReviewLayout: FunctionComponent<PropsWithChildren<ReviewPageProps>> = ({
  children,
}) => {
  return <>{children}</>;
};

export default ReviewLayout;
