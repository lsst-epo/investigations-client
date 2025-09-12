"use client";

import { useTranslation } from "react-i18next";
import Button from "@rubin-epo/epo-react-lib/Button";
// import signOut from "@/lib/auth/actions/signOut";
// import revokeRefreshToken from "@/lib/auth/session/revoke";
import { redirect, useRouter } from "next/navigation";

export default function SignOut({ redirectTo }: { redirectTo: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  // const signOutWithRedirect = signOut.bind(null, redirectTo);

  const handleSignOut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info("in handleSignOut");
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/auth-cookies",
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
      console.info("refreshing router");
      router.refresh();
      console.info("redirecting to: ", redirectTo);
      redirect(redirectTo);
    } catch (error: any) {
      console.error(error.message || "Logout failed");
    }
  };

  return (
    <form
      // action={signOutWithRedirect}
      // clear stored answers from browser storage
      // onSubmit={() => localStorage.clear()}
      onSubmit={handleSignOut}
    >
      <Button styleAs="tertiary" isBlock>
        {t("translation:auth.log_out")}
      </Button>
    </form>
  );
}
