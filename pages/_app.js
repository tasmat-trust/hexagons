import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import MainNavItems from '../components/layout/navigation/MainNavItems';
import SettingNavItems from '../components/layout/navigation/SettingNavItems';
import OrgPicker from '../components/layout/navigation/OrgPicker';
import ResponsiveDrawer from '../components/mui/ResponsiveDrawer';

import CssBaseline from '@material-ui/core/CssBaseline';

import { create } from 'jss';
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import useGlobalStyles from '../styles/useGlobalStyles';
import templatePlugin from 'jss-plugin-template';
import theme from '../styles/theme';
import Loading from '../components/ui-globals/Loading';
import { useState } from 'react';

import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import '@reach/skip-nav/styles.css';

// Data fetching
import { GraphQLClient } from 'graphql-request'
import { SWRConfig } from 'swr'

const jss = create({
  plugins: [...jssPreset().plugins, templatePlugin()],
});

function ThemeProviderWithGlobalStyles({ children }) {
  useGlobalStyles();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    // WHY: https://stackoverflow.com/questions/63521538/removing-server-side-injected-css
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const headers = pageProps.user
    ? {
        headers: {
          Authorization: `Bearer ${pageProps.user.strapiToken}`,
        },
      }
    : {};

  const graphqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, headers);

  const fetcher = async (query, variables) => {
    const data = await graphqlClient.request(query, variables);
    return data;
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProviderWithGlobalStyles theme={theme}>
        <StylesProvider jss={jss}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SkipNavLink />
          <SkipNavContent />
          <ResponsiveDrawer
            {...pageProps}
            menuOpen={menuOpen} 
            setMenuOpen={setMenuOpen}
            setLoading={setLoading}
            MainNavItems={MainNavItems}
            SettingNavItems={SettingNavItems}
            OrgPicker={OrgPicker}
          >
            <SWRConfig
              {...pageProps}
              value={{
                refreshInterval: 0,
                fetcher: fetcher,
              }}
            >
              {loading && <Loading message={loading} />}
              {!loading && <Component {...pageProps} menuOpen={menuOpen} setMenuOpen={setMenuOpen} gqlClient={graphqlClient} setLoading={setLoading} />}
            </SWRConfig>
          </ResponsiveDrawer>
        </StylesProvider>
      </ThemeProviderWithGlobalStyles>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
