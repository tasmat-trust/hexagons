import { Grid } from '@material-ui/core';

import checkSession from '../../components/auth/CheckSession'
import useAdminPage from "../../styles/useAdminPage";
import ManageUsers from '../../components/users/ManageUsers'
import ManageGroups from '../../components/groups/ManageGroups'

export default function Index(props) {

  const classes = useAdminPage()

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <ManageUsers userType="teacher" {...props} />
          </Grid>
          <Grid item md={4} xs={12}>
            <ManageGroups {...props} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Senior Leader')
}