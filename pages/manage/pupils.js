import checkSession from '../../components/auth/CheckSession'
import { Typography } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Card } from "@material-ui/core";
import useSWR from "swr"

import useAdminPage from '../../styles/useAdminPage';

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function Teachers() {

  const classes = useAdminPage()


  const { data, error } = useSWR(`${apiUrl}/pupils`)
  if (error) return <Typography>There has been an error</Typography>
  if (!data) return <Typography>Loading</Typography>

  return (

    <>
      <Paper elevation={2}>
        <Alert severity="info">This is an <b>Org Admin</b> page. It is only visible to Senior Leaders.</Alert>
      </Paper>
      <div className={classes.root}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={7}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title}>Manage pupils</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<AddIcon />}
                >
                  New pupil
                </Button>
              </Box>
              <Grid container spacing={2}>
                {data.map((pupil, i) => (
                  <Grid item xs={12} md={6} key={`school-${i}`}>
                    <Card className={classes.schoolCard}>
                      <Typography variant="h4" gutterBottom={true}>{pupil.name}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={5} xs={12}>
            <Paper variant="outlined" className={classes.paper}>
              <Typography variant="h4" component="h2">Levels</Typography>

            </Paper>
          </Grid>

        </Grid>
      </div>

    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Super Admin')
}