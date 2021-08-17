import { withSession } from '../auth/session'
import checkSession from '../../components/auth/checkSession'

import { Typography } from "@material-ui/core";

export default function Me(props) {
  return (
    <>
      <Typography variant="h1" gutterBottom={true}>Account</Typography>
      <Typography variant="p">Coming soon</Typography>
    </>
  )
}


export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})