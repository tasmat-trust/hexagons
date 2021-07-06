import { Grid, Paper, Box, Typography } from '@material-ui/core';

import checkSession from '../../components/auth/CheckSession'
import useAdminPage from "../../styles/useAdminPage";
import DialogButton from '../../components/mui/DialogButton'
import { AddNewGroup } from '../../components/forms/AddNew';
import ManageUsers from '../../components/users/ManageUsers'


import GroupsList from '../../components/groups/GroupsList'
// Utils
import { getOrgIdFromSession } from '../../utils';
import { useState } from 'react';

export default function Index(props) {

  const classes = useAdminPage()
  const orgId = getOrgIdFromSession(props.session)
  const [mutateGroup, setMutateGroup] = useState()

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <Paper variant="outlined" className={classes.paper}>
              <ManageUsers {...props} />
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title}>Groups</Typography>
                <DialogButton
                  className={classes.button}
                  label="New group"
                  data-test-id="new-group"
                  text="Create a new group. Teachers can then be assigned to groups."
                  model="group">
                  <AddNewGroup
                    {...props}
                    setSharedState={mutateGroup}
                    variables={{ orgId: orgId }}
                  />
                </DialogButton>
              </Box>
              <GroupsList
                {...props}
                setSharedState={setMutateGroup}
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
  return await checkSession(ctx, 'Senior Leader')
}