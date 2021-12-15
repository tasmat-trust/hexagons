import { Grid } from '@mui/material'

import { withSession } from '../../components/auth/session'
import checkSession from '../../components/auth/checkSession'

import useAdminPage from "../../styles/useAdminPage";

import ManageUsers from '../../components/manage/ManageUsers'
import ManageGroups from '../../components/manage/ManageGroups'
import BreadCrumbs from '../../components/navigation/Breadcrumbs';
import RoleInfoBanner from '../../components/layout/RoleInfoBanner';
import CustomHead from '../../components/ui-globals/CustomHead';

function Index(props) {

  const classes = useAdminPage()

  return (
    <>
      <CustomHead titleContent="Manage Pupils" />
      <RoleInfoBanner role="Teacher" />
      <BreadCrumbs firstLabel="Pupils" />
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

export default Index

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})