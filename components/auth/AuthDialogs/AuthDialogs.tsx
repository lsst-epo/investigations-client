import Dialog from "@/components/auth/dialogs";

export default function AuthDialogs({
  isAuthenticated = false,
}: {
  isAuthenticated?: boolean;
}) {
  /* The activate modal is the only one authenticated users may need to see */
  return !isAuthenticated ? (
    <>
      <Dialog.ForgotPassword />
      <Dialog.SelectGroup />
      <Dialog.SelectProvider />
      <Dialog.SetPassword />
      <Dialog.SignIn />
      <Dialog.SignInFacebook />
      <Dialog.SignUp />
      <Dialog.StatusPending />
      <Dialog.Activate />
    </>
  ) : (
    <Dialog.Activate />
  );
}
