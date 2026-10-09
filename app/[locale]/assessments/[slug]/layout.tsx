import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import AssessmentAuthWrapper from "@/components/templates/AssessmentAuthWrapper";
import { FunctionComponent, PropsWithChildren } from "react";
import { AssessmentPageParams } from "./page";

const AssessmentPageLayout: FunctionComponent<
  PropsWithChildren<AssessmentPageParams>
> = async ({ children }) => {
  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);

  return (
    <AssessmentAuthWrapper user={user}>
      <>{children}</>
    </AssessmentAuthWrapper>
  );
};

export default AssessmentPageLayout;
