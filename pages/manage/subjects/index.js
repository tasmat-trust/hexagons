import { Grid, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import checkSession from '../../../components/auth/CheckSession'
import useAdminPage from "../../../styles/useAdminPage";
import ManageSubjects from '../../../components/manage/ManageSubjects';
import BreadCrumbs from '../../../components/layout/navigation/Breadcrumbs';

import RoleInfoBanner from '../../../components/layout/RoleInfoBanner';

export default function Index(props) {

  const classes = useAdminPage()

  return (
    <>
      <RoleInfoBanner role="Senior Leader" />
      <BreadCrumbs {...props} firstLabel="Subjects" />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <ManageSubjects classes={classes} {...props} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Senior Leader')
}