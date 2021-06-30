import { Grid, Paper, Box, Typography } from '@material-ui/core';

import checkSession from '../../components/auth/CheckSession'

import DataFetcher from "../../components/data-fetching/DataFetcher";
import useAdminPage from "../../styles/useAdminPage";
import GroupsList from '../../components/groups/GroupsList';

// Utils
import { getOrgIdFromSession } from '../../utils';

import { allGroups, myGroups} from '../../queries/Groups'


export default function Index({ session }) {

  const classes = useAdminPage()

  const orgId = getOrgIdFromSession(session)

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title}>My groups</Typography>
              </Box>
              <DataFetcher query={myGroups} variables={{ teacherId: session.userId }}>
                  {(data) => <GroupsList groups={data.groups} />}
                </DataFetcher>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title}>All groups</Typography>
              </Box>
              <DataFetcher query={allGroups} variables={{ orgId: orgId }}>
                  {(data) => <GroupsList groups={data.groups} />}
                </DataFetcher>
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