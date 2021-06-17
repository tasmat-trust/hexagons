import checkSession from '../../components/auth/CheckSession'
import { Typography } from "@material-ui/core";

export default function Index() {
 
  return (
    <>
      <Typography variant="h1" gutterBottom={true}>Subjects</Typography>
      <Typography>Coming soon</Typography>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Authenticated')
}