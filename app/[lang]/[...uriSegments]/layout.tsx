import { FunctionComponent, PropsWithChildren } from "react";
import "focus-visible";
import SourceSansPro from "@/lib/fonts";
import StyledComponentsRegistry from "@/lib/registry";
import { languages } from "@/app/i18n/settings";
import GlobalStyles from "@/lib/styles";
import "@/styles/styles.scss";

import Header from "@/components/page/Header/Header";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

interface RootLayoutProps {
  params: {
    lang: string;
  };
}

const RootLayout: FunctionComponent<PropsWithChildren<RootLayoutProps>> = ({
  children,
  params: { lang },
}) => {
  return (
    <html lang={lang}>
      <head>
        <title>Investigations</title>
      </head>
      <body className={SourceSansPro.variable}>
        <StyledComponentsRegistry>
          <GlobalStyles includeFonts={false} />
          <Header />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
