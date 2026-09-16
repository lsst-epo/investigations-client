import { getUserFromJwt } from "@/components/auth/serverHelpers";
import { PropsWithChildren } from "react";
import * as Styled from "./styles";
import SignIn from "@/components/molecules/auth/SignInButton";
import SignUp from "@/components/molecules/auth/SignUpButton";
import { Button } from "@rubin-epo/epo-react-lib";

interface Props extends PropsWithChildren {
  user: ReturnType<typeof getUserFromJwt>;
  title?: string | null;
}

export default function AssessmentAuthWrapper({
  user,
  title,
  children,
}: Props) {
  return user?.group === "educators" ? (
    <>{children}</>
  ) : (
    <Styled.PageContainer
      bgColor="orange05"
      paddingSize="medium"
      width="narrow"
    >
      <h1>{title}</h1>
      <p>You must be an educator to access assessments.</p>
      <Styled.AuthWrapper>
        <SignIn />
        <SignUp />
        <Button>Back</Button>
      </Styled.AuthWrapper>
    </Styled.PageContainer>
  );
}
