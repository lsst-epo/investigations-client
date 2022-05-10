/* eslint-disable unused-imports/no-unused-imports */

import PropTypes from "prop-types";
import "@/lib/i18n";
import "focus-visible";
import { UIDReset } from "react-uid";
import GlobalStyles from "@/styles/globalStyles";
import styles from "@/styles/styles.scss";

function Client({ Component, pageProps }) {
  return (
    <UIDReset>
      <GlobalStyles />
      <Component {...pageProps} />
    </UIDReset>
  );
}

Client.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default Client;

/* eslint-enable unused-imports/no-unused-imports */
