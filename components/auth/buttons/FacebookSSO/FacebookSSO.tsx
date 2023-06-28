"use client";

import { useState } from "react";
import { Button } from "@rubin-epo/epo-react-lib";
import { useTranslation } from "@/lib/i18n/client";
import { getOauthUrl } from "./actions";

export default function FacebookSSO({ onError }: { onError: () => void }) {
  const [status, setStatus] = useState<"loading" | null>(null);

  const { t } = useTranslation();

  return (
    <Button
      onClick={async () => {
        setStatus("loading");
        try {
          const data = await getOauthUrl();

          if (data?.facebookOauthUrl) {
            const oauthUrl = new URL(data.facebookOauthUrl);

            const state = window.location.pathname;
            oauthUrl.searchParams.set("state", state);

            window.open(oauthUrl, "_self");
          }
        } catch (error) {
          onError();
        }
        setStatus(null);
      }}
      styleAs="tertiary"
    >
      {status === "loading"
        ? t("sign_in.redirecting_facebook")
        : t("sign_in.continue_with_facebook")}
    </Button>
  );
}
