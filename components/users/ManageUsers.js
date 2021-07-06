import DialogButton from "../mui/DialogButton"
import { AddNewTeacherWithGroups } from '../forms/AddNew'
import TeachersGrid from "../layout/data-tables/TeachersGrid"
import { Box, Typography } from "@material-ui/core"
import useAdminPage from "../../styles/useAdminPage"
import { getOrgIdFromSession } from '../../utils';
import { useState, memo } from "react"

function ManageUsersHeader(props) {

  const { classes, orgId, multiAddVisible } = props

  return (
    <>
      <Box className={classes.box}>
        <Typography variant="h4" component="h2" className={classes.title}>All users</Typography>

        {multiAddVisible && (
          <DialogButton
            className={classes.button}
            label="Assign role"
            text="Assign roles to teachers"
            model="group">
 
          </DialogButton>
        )}

        {multiAddVisible && (
          <DialogButton
            className={classes.button}
            label="Assign groups"
            text="Assign teachers to groups"
            model="group">
    
          </DialogButton>
        )}
        <DialogButton
          className={classes.button}
          label="New user"
          text="Add a new teacher and assign them groups and roles. You can always assign groups/roles later."
          model="user">
          <AddNewTeacherWithGroups
            {...props}
            variables={{ orgId: orgId }}
          />
        </DialogButton>
      </Box >
    </>
  )
}


const ManageUsersBody = memo(function ManageUsersBody(props) {
  const { orgId, showMultiAdd } = props
  return (
    <TeachersGrid variables={{ orgId: orgId }} showMultiAdd={showMultiAdd}></TeachersGrid>
  )
})

function ManageUsers(props) {
  const orgId = getOrgIdFromSession(props.session)
  const classes = useAdminPage()
  const [multiAddVisible, setMultiAddVisible] = useState(false)
  return (
    <>
      <ManageUsersHeader
        {...props}
        orgId={orgId}
        classes={classes}
        multiAddVisible={multiAddVisible}
      />
      <ManageUsersBody
        {...props}
        orgId={orgId}
        showMultiAdd={setMultiAddVisible}
      />
    </>
  )
}

export default ManageUsers