import { Grid } from '@material-ui/core';

import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'

import useAdminPage from "../../../styles/useAdminPage";
import Subjects from '../../../components/subjects/Subjects';
import BreadCrumbs from '../../../components/navigation/Breadcrumbs';

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
            <Subjects classes={classes} {...props} onwardHref={"/manage/subjects"} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Senior Leader')
})