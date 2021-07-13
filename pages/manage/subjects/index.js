import { Grid, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import checkSession from '../../../components/auth/CheckSession'
import useAdminPage from "../../../styles/useAdminPage";
import ManageSubjects from '../../../components/manage/ManageSubjects'

export default function Index(props) {

  const classes = useAdminPage()

  return (
    <>
      <Paper elevation={2}>
        <Alert severity="info" data-test-id="notification">This is an <b>SLT</b> page. It is only visible to Senior Leaders</Alert>
      </Paper>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <ManageSubjects classes={classes} variables={{}} {...props} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Senior Leader')
}