import checkSession from '../../components/auth/CheckSession' 
import Alert from '@material-ui/lab/Alert';
import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Typography, Card } from "@material-ui/core";
import useSWR from "swr"

import useAdminPage from '../../styles/useAdminPage';

const apiUrl = process.env.NEXT_PUBLIC_API_URL



export default function Index() {
  const classes = useAdminPage()

  const { data, error } = useSWR(`${apiUrl}/organizations`)
  if (error) return <Typography>There has been an error</Typography>
  if (!data) return <Typography>Loading</Typography>

  return (
    <>
      <Paper elevation={2}>
        <Alert severity="info">This is the <b>Global Admin</b> page. It is only visible to top-level administrators.</Alert>
      </Paper>
      <div className={classes.root}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={7}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title}>Organizations</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<AddIcon />}
                >
                  Create new Organization
                </Button>
              </Box>
              <Grid container spacing={2}>
                {data.map((school, i) => (
                  <Grid item xs={12} md={6} key={`school-${i}`}>
                    <Card className={classes.schoolCard}>
                      <img
                        className={classes.schoolCard_img}
                        alt="School logo"
                        height="120"
                        src={`${apiUrl}${school.logo.url}`}
                      />
                      <Typography variant="h4" gutterBottom={true}>{school.name}</Typography>
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