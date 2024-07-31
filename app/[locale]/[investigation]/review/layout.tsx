import { FunctionComponent, PropsWithChildren } from "react";
import { RootParams } from "../../layout";
import { InvestigationParams } from "../layout";
import { ProgressProvider } from "@/contexts/Progress";
import Header from "@/page/Header/Header";
import Pager from "@/page/Pager";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";

export interface ReviewPageProps {
  params: RootParams & InvestigationParams;
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
      <Pager enableAll={user?.group === "educators"} />
    </ProgressProvider>
  );
};

export default ReviewLayout;
