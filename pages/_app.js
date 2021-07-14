import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { Provider } from 'next-auth/client'

import MainNavItems from "../components/layout/navigation/MainNavItems"
import SettingNavItems from "../components/layout/navigation/SettingNavItems"
import OrgPicker from "../components/layout/navigation/OrgPicker"
import ResponsiveDrawer from "../components/mui/ResponsiveDrawer"
import Header from "../components/layout/Header"

import CssBaseline from '@material-ui/core/CssBaseline';

import { create } from 'jss';
import { ThemeProvider, StylesProvider, jssPreset } from "@material-ui/core/styles"
import useGlobalStyles from '../styles/useGlobalStyles';
import templatePlugin from 'jss-plugin-template'
import theme from "../styles/theme"

import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css"

// Data fetching
import { GraphQLClient } from 'graphql-request'
import { SWRConfig } from 'swr'

import { useState } from 'react';

const jss = create({
  plugins: [...jssPreset().plugins, templatePlugin()],
});


function ThemeProviderWithGlobalStyles({ children }) {
  useGlobalStyles()
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}


function MyApp({ Component, pageProps }) {

  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    // WHY: https://stackoverflow.com/questions/63521538/removing-server-side-injected-css
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const headers = pageProps.session ? {
    headers: {
      'Authorization': `Bearer ${pageProps.session.jwt}`
    }
  } : {}

  const graphqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, headers)

  const fetcher = async (query, variables) => {
    const data = await graphqlClient.request(query, variables)
    return data
  }
  return (
    <>
      <Provider session={pageProps.session}>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProviderWithGlobalStyles theme={theme}>
          <StylesProvider jss={jss}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <SkipNavLink />
            <Header></Header>
            <SkipNavContent />
            <ResponsiveDrawer {...pageProps} menuOpen={menuOpen} setMenuOpen={setMenuOpen} MainNavItems={MainNavItems} SettingNavItems={SettingNavItems} OrgPicker={OrgPicker}>
              <SWRConfig {...pageProps} value={{
                refreshInterval: 0,
                fetcher: fetcher
              }}>
                <Component {...pageProps} menuOpen={menuOpen} setMenuOpen={setMenuOpen} gqlClient={graphqlClient} />
              </SWRConfig>
            </ResponsiveDrawer>
          </StylesProvider>
        </ThemeProviderWithGlobalStyles>
      </Provider>
    </>
  )
}


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp


