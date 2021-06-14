import "../styles/globals.css"
import Header from "../layout-components/header"

import CssBaseline from '@material-ui/core/CssBaseline';
//import { ThemeProvider } from "@material-ui/core/styles"
//import theme from "../styles/theme"

import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
     
        <CssBaseline />
        <SkipNavLink />
        <Header></Header>
        <SkipNavContent />
        <Component {...pageProps} />
    
    </>
  )
}

export default MyApp
