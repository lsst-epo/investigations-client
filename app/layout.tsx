import { FunctionComponent, PropsWithChildren } from "react";
// import "@/lib/i18n";
import "focus-visible";
import SourceSansPro from "@/lib/fonts";
import StyledComponentsRegistry from "@/lib/registry";
import nextConfig from "../next.config";
import GlobalStyles from "@/lib/styles";
import "@/styles/styles.scss";

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { defaultLocale } = nextConfig.i18n;
  return (
    <html lang={defaultLocale}>
      <head>
        <title>Investigations App Directory</title>
      </head>
      <body className={SourceSansPro.variable}>
        <StyledComponentsRegistry>
          <GlobalStyles includeFonts={false} />
          <h1>I am the layout</h1>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
