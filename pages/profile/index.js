import checkSession from '../../components/auth/CheckSession'
import { Typography } from "@material-ui/core";

export default function Index() {
 
  return (
    <>
      <Typography variant="h1" gutterBottom={true}>Profile</Typography>
      <Typography variant="p">Coming soon</Typography>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Authenticated')
}