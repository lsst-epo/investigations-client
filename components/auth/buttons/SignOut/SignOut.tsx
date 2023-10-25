"use client";

import Button from "@rubin-epo/epo-react-lib/Button";
import { signOut } from "./actions";

export default function SignOut({ redirectTo }: { redirectTo: string }) {
  const signOutWithRedirect = signOut.bind(null, redirectTo);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      action={signOutWithRedirect}
      // clear stored answers from browser storage
      onSubmit={() => localStorage.clear()}
    >
      <Button className="sign-out">Sign out</Button>
    </form>
  );
}
