// N.B.  This doesn't work as the page component itself MUST export getServerSideProps
// However, it's a good example of a working functional Higher Order Component

import checkSession from './CheckSession'

export const withSessionChecker = PageComponent => {
  return props => {
    return <PageComponent {...props} />
  }
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Teacher')
}