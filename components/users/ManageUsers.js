import DialogButton from "../mui/DialogButton"
import { AddNewUserWithGroups } from '../forms/AddNew'
import UsersGrid from "../layout/data-tables/UsersGrid"
import { Box, Typography, Paper } from "@material-ui/core"
import useAdminPage from "../../styles/useAdminPage"
import { getOrgIdFromSession } from '../../utils';
import { useState, memo } from "react"

function ManageUsersHeader(props) {

  const { classes, orgId, multiAddVisible, userType } = props

  return (
    <>
      <Box className={classes.box}>
        <Typography variant="h4" component="h2" className={classes.title} data-test-id="title">All {userType}s</Typography>

        {multiAddVisible && userType === 'teacher' && (
          <DialogButton
            data-test-id="assign-roles"
            className={classes.button}
            label="Assign role"
            text={`Assign roles to ${userType}s`}
            model="group">

          </DialogButton>
        )}

        {multiAddVisible && (
          <DialogButton
            data-test-id="assign-groups"
            className={classes.button}
            label="Assign groups"
            text={`Assign ${userType}s to groups`}
            model="group">

          </DialogButton>
        )}
        <DialogButton
          data-test-id={`new-${userType}`}
          className={classes.button}
          label={`New ${userType}`}
          text={`Add a new ${userType} and assign them groups. You can always assign groups later.`}
          model={userType === 'teacher' ? 'user' : 'pupil'}>
          <AddNewUserWithGroups
            {...props}
            variables={{ orgId: orgId }}
          />
        </DialogButton>
      </Box >
    </>
  )
}

const ManageUsersBody = memo(function ManageUsersBody(props) {
  const { orgId } = props

  return (
    <UsersGrid {...props} variables={{ orgId: orgId }}></UsersGrid>
  )
})

function ManageUsers(props) {
  const orgId = getOrgIdFromSession(props.session)
  const classes = useAdminPage()
  const [multiAddVisible, setMultiAddVisible] = useState(false)
  const [mutateUsers, setMutateUsers] = useState()
  return (
    <Paper variant="outlined" className={classes.paper}>
      <ManageUsersHeader
        {...props}
        orgId={orgId}
        classes={classes}
        triggerSharedState={mutateUsers}
        multiAddVisible={multiAddVisible}
      />
      <ManageUsersBody
        {...props}
        orgId={orgId}
        setSharedState={setMutateUsers}
        showMultiAdd={setMultiAddVisible}
      />
    </Paper>
  )
}

export default ManageUsers