import checkSession from '../../components/auth/CheckSession'
import { Typography } from "@material-ui/core";

export default function Teachers() {
 
  return (
    <>
      <Typography variant="h1" gutterBottom={true}>Manage teachers</Typography>
      <Typography variant="p">Coming soon</Typography>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Super Admin')
}