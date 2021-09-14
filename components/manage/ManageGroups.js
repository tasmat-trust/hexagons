
import { Paper, Box, Typography } from '@material-ui/core';
import DialogButton from '../ui-globals/DialogButton'
import GroupsList from '../../components/groups/GroupsList'

import { AddNewGroup } from '../../components/forms/AddNew';
import { useContext, useState } from 'react';
import useAdminPage from "../../styles/useAdminPage";
import { HexagonsContext } from '../data-fetching/HexagonsContext';


export default function ManageGroups(props) {
  const { user, userType } = props
  const classes = useAdminPage()
  const { orgId}  = useContext(HexagonsContext)
  const [mutateGroup, setMutateGroup] = useState()
  return (
    <Paper variant="outlined" className={classes.paper}>
      <Box className={classes.box}>
        <Typography variant="h4" component="h2" className={classes.title}>Groups</Typography>
        <DialogButton
          className={classes.button}
          label="New group"
          testId="new-group"
          variant='contained'
          color='secondary'
          text={`Create a new group - ${userType}s can then be assigned to groups.`}
          modelname="group">
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
        getGroupsVariables={{ orgId: orgId }}
      />
    </Paper>
  )
}

