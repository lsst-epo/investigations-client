"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import FacebookLogin from '@greatsumini/react-facebook-login';

export default function FacebookSSO({
  className,
  onError,
}: {
  className: string;
  onError: () => void;
}) {
  const [status, setStatus] = useState<"loading" | null>(null);

  const { t } = useTranslation();

  return (<FacebookLogin
    appId=""
    onSuccess={(response) => {
      // eslint-disable-next-line no-console
      console.log('Login Success!', response);
    }}
    onFail={(error) => {
      // eslint-disable-next-line no-console
      console.log('Login Failed!', error);
    }}
    onProfileSuccess={(response) => {
      // eslint-disable-next-line no-console
      console.log('Get Profile Success!', response);
    }}
  />);

  // return (
  //   <Button
  //     className={className}
  //     onClick={async () => {
  //       setStatus("loading");
  //       try {
  //         const data = await getOauthUrl();

  //         if (data?.facebookOauthUrl) {
  //           const oauthUrl = new URL(data.facebookOauthUrl);

  //           const state = window.location.pathname;
  //           oauthUrl.searchParams.set("state", state);

  //           window.open(oauthUrl, "_self");
  //         }
  //       } catch (error) {
  //         onError();
  //       }
  //       setStatus(null);
  //     }}
  //     styleAs="tertiary"
  //   >
  //     {status === "loading"
  //       ? t("sign_in.redirecting_facebook")
  //       : t("sign_in.continue_with_facebook")}
  //   </Button>
  // );
}
