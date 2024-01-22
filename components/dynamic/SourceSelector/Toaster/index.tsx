"use client";
import { ToastBar } from "react-hot-toast";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import * as Styled from "./styles";

const Toaster = () => {
  return (
    <Styled.Toaster
      position="top-center"
      toastOptions={{
        blank: {
          icon: <IconComposer size="1em" icon="Checkmark" />,
        },
      }}
      containerStyle={{
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: "none",
        overflow: "hidden",
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            animation: t.visible
              ? "slideIn var(--DURATION,0.2s) ease forwards"
              : "slideOut var(--DURATION,0.2s) ease forwards",
            backgroundColor: "#000",
            borderRadius: 0,
            boxShadow: "none",
            color: "#30e0e3",
            fontWeight: "var(--FONT_WEIGHT_BOLD, 600)",
            padding: "0.5em",
            maxWidth: "100%",
            width: "100%",
          }}
        >
          {({ icon, message }) => (
            <Styled.ToastContainer>
              {icon}
              {message}
            </Styled.ToastContainer>
          )}
        </ToastBar>
      )}
    </Styled.Toaster>
  );
};

export default Toaster;
