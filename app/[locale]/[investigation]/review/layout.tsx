import { FunctionComponent, PropsWithChildren } from "react";
import { RootLayoutParams } from "../../layout";
import { InvestigationParams } from "../layout";
import { ProgressProvider } from "@/contexts/Progress";
import Header from "@/page/Header/Header";
import Pager from "@/page/Pager";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";

export interface ReviewPageProps {
  params: RootLayoutParams & InvestigationParams;
}

const ReviewLayout: FunctionComponent<
  PropsWithChildren<ReviewPageProps>
> = async ({ children }) => {
  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);

  return (
    <ProgressProvider currentPageId="review">
      <Header {...{ user }} />
      {children}
      <Pager />
    </ProgressProvider>
  );
};

export default ReviewLayout;
