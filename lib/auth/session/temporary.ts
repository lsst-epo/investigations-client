import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies, headers } from "next/headers";

interface ResetPasswordSession {
  email: string;
  returnTo: string | null;
}

export const resetPasswordSession = () => {
  const options: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: true,
    sameSite: true,
  };
  const sessionName = "resetPassword";

  const create = (email: string) => {
    const returnTo = headers().get("referer");
    return cookies().set(
      sessionName,
      JSON.stringify({ email, returnTo }),
      options
    );
  };

  const get = (): ResetPasswordSession | undefined => {
    const unparsed = cookies().get(sessionName)?.value;

    if (unparsed) {
      return JSON.parse(unparsed);
    } else {
      return undefined;
    }
  };

  const destroy = () => cookies().delete(sessionName);

  return {
    create,
    get,
    destroy,
  };
};
