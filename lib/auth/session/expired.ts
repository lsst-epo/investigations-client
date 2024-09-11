import { jwtDecode } from "jwt-decode";

const isSessionExpired = (token: string): boolean => {
  const { exp } = jwtDecode(token);

  if (!exp) return false;

  return Date.now() >= exp * 1000;
};

export default isSessionExpired;
