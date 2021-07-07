import { Grid, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import checkSession from '../../components/auth/CheckSession'
import useAdminPage from "../../styles/useAdminPage";
import ManageUsers from '../../components/users/ManageUsers'
import ManageGroups from '../../components/groups/ManageGroups'

export default function Index(props) {

  const classes = useAdminPage()

  return (
    <>
      <Paper elevation={2}>
        <Alert severity="info" data-test-id="notification">This is a <b>Senior Leader</b> page. It is only visible to Senior Leaders</Alert>
      </Paper>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <ManageUsers userType="teacher" {...props} />
          </Grid>
          <Grid item md={4} xs={12}>
            <ManageGroups userType="teacher" {...props} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Senior Leader')
}