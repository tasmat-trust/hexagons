import { Grid, Paper, Box, Typography } from '@material-ui/core';

import { withSession } from '../../middlewares/session'
import { checkSession } from '../../components/auth/checkSession'

import useAdminPage from "../../styles/useAdminPage";
import GroupsList from '../../components/groups/GroupsList';

// Utils
import { getOrgIdFromSession } from '../../utils';

import BreadCrumbs from '../../components/layout/navigation/Breadcrumbs';


export default function Index(props) {

  const { user } = props;

  const classes = useAdminPage()

  const orgId = getOrgIdFromSession(user)

  return (
    <>
      <BreadCrumbs {...props} firstLabel="Groups" />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography data-test-id="title" variant="h4" component="h2" className={classes.title}>My groups</Typography>
              </Box>

              <GroupsList {...props} getMyGroups={true} variables={{ teacherId: user.id }} />

            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title}>All groups</Typography>
              </Box>


              <GroupsList
                {...props}
                variables={{ orgId: orgId }}
              />

            </Paper>
          </Grid>
        </Grid>
      </div>


    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})