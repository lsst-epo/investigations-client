import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import nextConfig from "../next.config";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID;

class CustomDocument extends Document<{
  locale: string;
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const { renderPage: originalRenderPage } = ctx;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const { locale = nextConfig.i18n.defaultLocale } = ctx;

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        locale,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { locale } = this.props;

    return (
      <Html lang={locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
