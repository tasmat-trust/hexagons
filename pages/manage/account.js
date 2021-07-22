import { withSession } from '../../middlewares/session'
import { checkIronSession } from '../../components/auth/checkIronSession'

import { Typography } from "@material-ui/core";

export default function Index() {
 
  return (
    <>
      <Typography variant="h1" gutterBottom={true}>Account</Typography>
      <Typography variant="p">Coming soon</Typography>
    </>
  )
}


export const getServerSideProps = withSession((ctx) => {
  return checkIronSession(ctx, 'Teacher')
})