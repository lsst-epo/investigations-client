import PropTypes from "prop-types";
import Head from "next/head";
import siteInfoShape from "@/shapes/siteInfo";

export default function HtmlHead({
  title,
  siteInfo: { siteTitle, siteDescription },
  children,
}) {
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={siteDescription} />
      <meta name="og:url" content="" />
      <meta name="og:type" content="article" />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={siteDescription} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:card" content="summary" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      {children}
    </Head>
  );
}

HtmlHead.displayName = "Global.HtmlHead";

HtmlHead.propTypes = {
  siteInfo: siteInfoShape,
  title: PropTypes.string,
  children: PropTypes.node,
};
