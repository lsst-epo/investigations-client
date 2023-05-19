import localFont from "next/font/local";

const SourceSansPro = localFont({
  src: [
    {
      path: "../app/fonts/source-sans-pro-v18-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-700-italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-900.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-900-italic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-700.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-700-italic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-900.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "../app/fonts/source-sans-pro-v18-latin-900-italic.woff",
      weight: "900",
      style: "italic",
    },
  ],
  fallback: ["sans-serif"],
  variable: "--FONT_STACK_BASE",
});

export default SourceSansPro;
