
import { Paper, Box, Typography } from '@material-ui/core';
import DialogButton from '../../components/mui/DialogButton'
import GroupsList from '../../components/groups/GroupsList'

import { AddNewGroup } from '../../components/forms/AddNew';
import { useState } from 'react';
import useAdminPage from "../../styles/useAdminPage";

// Utils
import { getOrgIdFromSession } from '../../utils';

export default function ManageGroups(props) {
  const { session, userType } = props
  const classes = useAdminPage()
  const orgId = getOrgIdFromSession(session)
  const [mutateGroup, setMutateGroup] = useState()
  return (
    <Paper variant="outlined" className={classes.paper}>
      <Box className={classes.box}>
        <Typography variant="h4" component="h2" className={classes.title}>Groups</Typography>
        <DialogButton
          className={classes.button}
          label="New group"
          data-test-id="new-group"
          text={`Create a new group - ${userType}s can then be assigned to groups.`}
          model="group">
          <AddNewGroup
            {...props}
            triggerSharedState={mutateGroup}
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
  )
}

