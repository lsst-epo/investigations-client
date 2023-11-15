"use client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useFormStatus } from "react-dom";
import { Button } from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";

export default function Submit({
  children,
  className,
  ...restProps
}: Omit<React.ComponentPropsWithoutRef<typeof Button>, "children"> & {
  children: (pending: boolean) => React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Styled.SaveButton
      className={className}
      type="submit"
      disabled={pending}
      {...restProps}
    >
      {children(pending)}
    </Styled.SaveButton>
  );
}
