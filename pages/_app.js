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
import templatePlugin from 'jss-plugin-template'
import theme from "../styles/theme"

import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css"


import { SWRConfig } from 'swr'


const jss = create({
  plugins: [...jssPreset().plugins, templatePlugin()],
});


function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    // WHY: https://stackoverflow.com/questions/63521538/removing-server-side-injected-css
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  const fetcher = async (url, opts) => {
    const headers = {
      headers: {
        'Authorization': `Bearer ${pageProps.session.jwt}`,
        ...opts
      }
    }
    const res = await fetch(url, headers)
    const data = await res.json()
    if (res.status !== 200) {
      throw new Error(data.message)
    }
    return data
  }


  return (
    <>
      <Provider session={pageProps.session}>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <StylesProvider jss={jss}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <SkipNavLink />
            <Header></Header>
            <SkipNavContent />
            <ResponsiveDrawer {...pageProps} MainNavItems={MainNavItems} SettingNavItems={SettingNavItems} OrgPicker={OrgPicker}>
              <SWRConfig {...pageProps} value={{ refreshInterval: 3000, fetcher: fetcher }}>
                <Component {...pageProps} />
              </SWRConfig>
            </ResponsiveDrawer>
          </StylesProvider>
        </ThemeProvider>
      </Provider>
    </>
  )
}


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp


