"use client";

import { useTranslation } from "react-i18next";
import Button from "@rubin-epo/epo-react-lib/Button";
import { useRouter } from "next/navigation";

export default function SignOut({ redirectTo }: { redirectTo: string }) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSignOut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/cookie",
        {
          method: "DELETE",
          body: JSON.stringify({ path: redirectTo }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        console.error(err.message || "Unexpected error while logging out");
      }
      localStorage.clear();
      router.refresh();
    } catch (error: any) {
      console.error(error.message || "Logout failed");
    }
  };

  return (
    <form
      onSubmit={handleSignOut}
    >
      <Button styleAs="tertiary" isBlock>
        {t("translation:auth.log_out")}
      </Button>
    </form>
  );
}
