import checkSession from '../../components/auth/CheckSession'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";
import useSWR from "swr"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));


export default function Index({ session }) {
  const classes = useStyles()
  const fetcher = async (url) => {

    const headers = {
      headers: {
        'Authorization': `Bearer ${session.jwt}`,
      }
    }

    const res = await fetch(url, headers)
    const data = await res.json()

    if (res.status !== 200) {
      throw new Error(data.message)
    }
    return data
  }


  const { orgs, error } = useSWR(
    () => `http://localhost:1337/organizations`,
    fetcher
  )

  return (
    <>
      <Paper elevation={2}>
        <Alert severity="info">This is the <b>Global Admin</b> page. It is only visible to top-level administrators.</Alert>
      </Paper>
      <div className={classes.root}>
        <Grid container spacing={3}>

          <Grid item xs={7}>
            <Paper variant="outlined" className={classes.paper}>
              <Typography variant="h4" component="h2">Organizations</Typography>
            </Paper>
          </Grid>
          <Grid item xs={5}>
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