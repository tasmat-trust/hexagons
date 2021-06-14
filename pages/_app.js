import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import MainNavItems from "../components/layout/navigation/MainNavItems"
import ResponsiveDrawer from "../components/mui/ResponsiveDrawer"
import Header from "../components/layout/Header"

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "../styles/theme"

import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css"

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SkipNavLink />
        <Header></Header>
        <SkipNavContent />
        <ResponsiveDrawer MainNavItems={MainNavItems}>
          <Component {...pageProps} />
        </ResponsiveDrawer>
      </ThemeProvider>
    </>
  )
}


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
