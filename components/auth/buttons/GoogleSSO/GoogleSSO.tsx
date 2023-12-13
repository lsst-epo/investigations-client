"use client";

import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useResizeObserver from "use-resize-observer";
import Button from "./Button";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID;

export default function GoogleSSO({
  className,
  onError,
}: {
  className: string;
  onError: () => void;
}) {
  const [buttonWidth, setButtonWidth] = useState();

  const { ref } = useResizeObserver({
    onResize: ({ width }) => {
      setButtonWidth(width);
    },
  });

  if (!GOOGLE_APP_ID) return null;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_APP_ID}>
      <div ref={ref}>
        <Button
          className={className}
          onError={onError}
          buttonWidth={buttonWidth}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
