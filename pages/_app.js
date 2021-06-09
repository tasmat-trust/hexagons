import "../styles/globals.css"
import Header from "../layout-components/header"

import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SkipNavLink />
      <Header></Header>
      <SkipNavContent />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
