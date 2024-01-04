"use client";
import { ToastBar, toast } from "react-hot-toast";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import * as Styled from "./styles";

const Toaster = () => {
  return (
    <Styled.Toaster
      position="bottom-center"
      toastOptions={{
        blank: {
          icon: <IconComposer size="2em" icon="Info" />,
        },
        error: {
          duration: 6000,
          icon: <IconComposer size="1em" icon="Close" />,
        },
        success: {
          duration: 4000,
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
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            animation: t.visible
              ? "slideIn var(--DURATION,0.2s) ease forwards"
              : "slideOut var(--DURATION,0.2s) ease forwards",
            backgroundColor: "#dce0e3",
            borderRadius: 0,
            boxShadow: "none",
            color: "var(--neutral95,#1F2121)",
            padding: "1.5em",
            maxWidth: "100%",
            width: "100%",
          }}
        >
          {({ icon, message }) => (
            <Styled.ToastContainer>
              {icon && <Styled.ToastIcon>{icon}</Styled.ToastIcon>}
              {message}
              {t.type !== "loading" && (
                <Styled.CloseToast onClick={() => toast.dismiss(t.id)}>
                  <IconComposer size="1em" icon="close" />
                </Styled.CloseToast>
              )}
            </Styled.ToastContainer>
          )}
        </ToastBar>
      )}
    </Styled.Toaster>
  );
};

export default Toaster;
