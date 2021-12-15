import DialogButton from '../ui-globals/DialogButton';
import { AddNewUserWithGroups } from '../forms/AddNew';
import { AssignGroupsToUser, AssignRoleToUser } from '../forms/AssignTo';
import UsersGrid from '../layout/data-tables/UsersGrid';
import { Box, Typography, Paper } from '@mui/material';
import useAdminPage from '../../styles/useAdminPage';
import { useState, memo, useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import CustomSuspense from '../data-fetching/CustomSuspense';
import DeletePupil from '../forms/DeletePupil';

function ManageUsersHeader(props) {
  const { classes, multiAddVisible, userType } = props;
  const { orgId, role } = useContext(HexagonsContext);
  return (
    <>
      <Box className={classes.box}>
        <Typography variant="h4" component="h2" className={classes.title} data-test-id="title">
          All {userType}s
        </Typography>

        {multiAddVisible && userType === 'pupil' && role === 'Leader' && (
          <DialogButton
            title="Delete pupil"
            variant="outlined"
            color="primary"
            testId="delete-pupil"
            className={classes.button}
            label="Delete pupil"
            modelname="pupil"
          >
            <DeletePupil {...props} pupilId={props.selectedUsers[0]} />
          </DialogButton>
        )}

        {multiAddVisible && userType === 'teacher' && (
          <DialogButton
            title="Assign roles to teachers"
            variant="contained"
            color="secondary"
            testId="assign-roles"
            className={classes.button}
            label="Assign role"
            text={`Assign roles to ${userType}s`}
            modelname="group"
          >
            <AssignRoleToUser {...props} modelname="role" />
          </DialogButton>
        )}

        {multiAddVisible && (
          <DialogButton
            title={`Assign ${userType}s to groups`}
            variant="contained"
            color="secondary"
            testId="assign-groups"
            className={classes.button}
            label="Assign groups"
            text={`Assign ${userType}s to groups`}
            modelname="group"
          >
            <CustomSuspense message="Loading groups">
              <AssignGroupsToUser {...props} modelname="group" variables={{ orgId: orgId }} />
            </CustomSuspense>
          </DialogButton>
        )}
        <DialogButton
          title={`Create new ${userType}`}
          variant="contained"
          color="secondary"
          testId={`new-${userType}`}
          className={classes.button}
          label={`New ${userType}`}
          text={`Add a new ${userType} and assign them groups. You can always assign groups later.`}
          modelname={userType === 'teacher' ? 'user' : 'pupil'}
        >
          <CustomSuspense message="Loading groups">
            <AddNewUserWithGroups
              {...props}
              modelname={userType === 'teacher' ? 'user' : 'pupil'}
              variables={{ orgId: orgId }}
            />
          </CustomSuspense>
        </DialogButton>
      </Box>
    </>
  );
}

const ManageUsersBody = memo(function ManageUsersBody(props) {
  const { orgId } = useContext(HexagonsContext);

  return <UsersGrid {...props} variables={{ orgId: orgId }}></UsersGrid>;
});

function ManageUsers(props) {
  const classes = useAdminPage();
  const [multiAddVisible, setMultiAddVisible] = useState(false);
  const [mutateUsers, setMutateUsers] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  return (
    <Paper variant="outlined" className={classes.paper}>
      <ManageUsersHeader
        {...props}
        classes={classes}
        allUsers={allUsers}
        selectedUsers={selectedUsers}
        setSharedState={setMutateUsers}
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
  );
}

export default ManageUsers;
