import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { Alert } from '@mui/material';
import MainNavItems from '../components/navigation/MainNavItems';
import SettingNavItems from '../components/navigation/SettingNavItems';
import OrgPicker from '../components/navigation/OrgPicker';
import ResponsiveDrawer from '../components/navigation/ResponsiveDrawer';

import CustomSuspense from '../components/data-fetching/CustomSuspense';
import ErrorBoundary from '../components/data-fetching/ErrorBoundary';
import NextNprogress from 'nextjs-progressbar';
import CssBaseline from '@mui/material/CssBaseline';

import globalStyles from '../styles/globalStyles';
import GlobalStyles from '@mui/material/GlobalStyles';

import { create } from 'jss';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import StylesProvider from '@mui/styles/StylesProvider';
import jssPreset from '@mui/styles/jssPreset';
import templatePlugin from 'jss-plugin-template';
import nestedPlugin from 'jss-plugin-nested';
import theme from '../styles/theme';
import Loading from '../components/ui-globals/Loading';
import { useState, useEffect } from 'react';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import '@reach/skip-nav/styles.css';
import { AnimateSharedLayout } from 'framer-motion';
import Footer from '../components/layout/Footer';

// Data fetching
import { GraphQLClient } from 'graphql-request';
import { SWRConfig } from 'swr';
import { getOrgIdFromSession } from '../utils';

import { HexagonsContext } from '../components/data-fetching/HexagonsContext';
import { flattenDataAttributes } from '../components/data-fetching/useSWRWrapped';

const inputGlobalStyles = <GlobalStyles styles={globalStyles as any} />;

const jss = create({
  plugins: [...jssPreset().plugins, templatePlugin(), nestedPlugin()],
});

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    setIsClient(isClient);
  }, []);

  useEffect(() => {
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

  const gqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, headers);

  const fetcher = async (query, variables) => {
    const data = await gqlClient.request(query, variables);
    return flattenDataAttributes(data);
  };
  let orgId = 0;
  if (pageProps.user) {
    if (pageProps.user.organization) {
      orgId = getOrgIdFromSession(pageProps.user);
    }
  }

  let role = 'public';
  let userId = 0;
  let useEarlyDevelopment = false;
  let useFunctionalSkills = false;
  if (pageProps.user) {
    role = pageProps?.user?.role?.name;
    userId = pageProps?.user?.id;
    useEarlyDevelopment = pageProps?.user?.organization?.use_early_development;
    useFunctionalSkills = pageProps?.user?.organization?.use_functional_skills;
  }

  const hexagonsGlobals = {
    gqlClient,
    orgId,
    role,
    userId,
    useEarlyDevelopment,
    useFunctionalSkills,
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <NextNprogress color={theme.palette.secondary.light} />
      <AnimateSharedLayout>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <StylesProvider jss={jss}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {inputGlobalStyles}
              <SkipNavLink />
              <SkipNavContent />
              <HexagonsContext.Provider value={hexagonsGlobals}>
                <ResponsiveDrawer
                  {...pageProps}
                  MainNavItems={MainNavItems}
                  SettingNavItems={SettingNavItems}
                  OrgPicker={OrgPicker}
                >
                  <SWRConfig
                    {...pageProps}
                    value={{
                      refreshInterval: 0,
                      fetcher: fetcher,
                      revalidateOnFocus: false,
                      revalidateOnReconnect: false,
                    }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      {isClient ? (
                        <ErrorBoundary
                          fallback={
                            <Alert severity="error">
                              Could not fetch data. Please check your connection.
                            </Alert>
                          }
                        >
                          <CustomSuspense message="Hexagonalising">
                            <Component {...pageProps} orgType />
                          </CustomSuspense>
                        </ErrorBoundary>
                      ) : (
                        <Loading message="Loading from server" />
                      )}
                    </div>

                    <Footer />
                  </SWRConfig>
                </ResponsiveDrawer>
              </HexagonsContext.Provider>
            </StylesProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </AnimateSharedLayout>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
