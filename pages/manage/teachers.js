import { Grid, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { withSession } from '../../components/auth/session'
import checkSession from '../../components/auth/checkSession'

import useAdminPage from "../../styles/useAdminPage";
import ManageUsers from '../../components/manage/ManageUsers'
import ManageGroups from '../../components/manage/ManageGroups'

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

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Senior Leader')
})