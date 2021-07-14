import { Grid, Paper, Box, Typography } from '@material-ui/core';

import checkSession from '../../components/auth/CheckSession'

import DataFetcher from "../../components/data-fetching/DataFetcher";
import useAdminPage from "../../styles/useAdminPage";
import GroupsList from '../../components/groups/GroupsList';

// Utils
import { getOrgIdFromSession } from '../../utils';

import BreadCrumbs from '../../components/layout/navigation/Breadcrumbs';


export default function Index(props) {

  const { session } = props;

  const classes = useAdminPage()

  const orgId = getOrgIdFromSession(session)

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

              <GroupsList {...props} getMyGroups={true} variables={{ teacherId: session.userId }} />

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

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Teacher')
}