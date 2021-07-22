import useSWR from "swr"
import Grid from '@material-ui/core/Grid';

import { withSession } from '../../middlewares/session'
import { checkSession } from '../../components/auth/checkSession'

import PupilCard from "../../components/pupil/PupilCard"
import { Typography } from "@material-ui/core";
import BreadCrumbs from "../../components/layout/navigation/Breadcrumbs";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index(props) {
  const { data, error } = useSWR("/api/pupils", fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <BreadCrumbs {...props} firstLabel="Pupils" />
      <Typography variant="h1" gutterBottom={true}>Pupils</Typography>
      <Grid container spacing={3}>
        {data.map((p, i) => (
          <Grid key={`pupil-${i}`} item xs={4}>
            <PupilCard key={i} pupil={p} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})
