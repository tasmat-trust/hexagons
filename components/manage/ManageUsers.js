import DialogButton from "../ui-globals/DialogButton"
import { AddNewUserWithGroups } from '../forms/AddNew'
import { AssignGroupsToUser } from '../forms/AssignTo'
import UsersGrid from "../layout/data-tables/UsersGrid"
import { Box, Typography, Paper } from "@material-ui/core"
import useAdminPage from "../../styles/useAdminPage"
import { useState, memo, useContext } from "react"
import { HexagonsContext } from "../data-fetching/HexagonsContext"

function ManageUsersHeader(props) {

  const { classes, multiAddVisible, userType } = props
  const { orgId } = useContext(HexagonsContext)
  return (
    <>
      <Box className={classes.box}>
        <Typography variant="h4" component="h2" className={classes.title} data-test-id="title">All {userType}s</Typography>

        {multiAddVisible && userType === 'teacher' && (
          <DialogButton
            variant='contained'
            color='secondary'
            testId="assign-roles"
            className={classes.button}
            label="Assign role"
            text={`Assign roles to ${userType}s`}
            modelname="group">

          </DialogButton>
        )}

        {multiAddVisible && (
          <DialogButton
            variant='contained'
            color='secondary'
            testId="assign-groups"
            className={classes.button}
            label="Assign groups"
            text={`Assign ${userType}s to groups`}
            modelname="group">
            <AssignGroupsToUser
              {...props}
              modelname="group"
              variables={{ orgId: orgId }} />
          </DialogButton>
        )}
        <DialogButton
          variant='contained'
          color='secondary'
          testId={`new-${userType}`}
          className={classes.button}
          label={`New ${userType}`}
          text={`Add a new ${userType} and assign them groups. You can always assign groups later.`}
          modelname={userType === 'teacher' ? 'user' : 'pupil'}>
          <AddNewUserWithGroups
            {...props}
            modelname={userType === 'teacher' ? 'user' : 'pupil'}
            variables={{ orgId: orgId }}
          />
        </DialogButton>
      </Box >
    </>
  )
}

const ManageUsersBody = memo(function ManageUsersBody(props) {
  const { orgId } = useContext(HexagonsContext)

  return (
    <UsersGrid {...props} variables={{ orgId: orgId }}></UsersGrid>
  )
})

function ManageUsers(props) {
  const classes = useAdminPage()
  const [multiAddVisible, setMultiAddVisible] = useState(false)
  const [mutateUsers, setMutateUsers] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  return (
    <Paper variant="outlined" className={classes.paper}>
      <ManageUsersHeader
        {...props}
        classes={classes}
        allUsers={allUsers}
        selectedUsers={selectedUsers}
        triggerSharedState={mutateUsers}
        multiAddVisible={multiAddVisible}
      />
      <ManageUsersBody
        {...props}
        setAllUsers={setAllUsers}
        setSelectedUsers={setSelectedUsers}
        setSharedState={setMutateUsers}
        showMultiAdd={setMultiAddVisible}
      />
    </Paper>
  )
}

export default ManageUsers