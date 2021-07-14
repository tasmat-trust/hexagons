import { Grid, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import checkSession from '../../components/auth/CheckSession'
import useAdminPage from "../../styles/useAdminPage";
import ManageUsers from '../../components/users/ManageUsers'
import ManageGroups from '../../components/groups/ManageGroups'
import BreadCrumbs from '../../components/layout/navigation/Breadcrumbs';
import RoleInfoBanner from '../../components/layout/RoleInfoBanner';

export default function Index(props) {

  const classes = useAdminPage()

  return (
    <>
      <RoleInfoBanner role="Teacher" />
      <BreadCrumbs {...props} firstLabel="Pupils" />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <ManageUsers userType="pupil" {...props} />
          </Grid>
          <Grid item md={4} xs={12}>
            <ManageGroups userType="pupil" {...props} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Teacher')
}