import useSWR from "swr"
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import PupilCard from "../../components/pupil/PupilCard"
import { Typography } from "@material-ui/core";


const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSWR("/api/pupils", fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Typography variant="h1" gutterBottom={true}>Pupils</Typography>
      <Grid container spacing={3}>
        {data.map((p, i) => (
          <Grid item xs={4}>
            <PupilCard key={i} pupil={p} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
