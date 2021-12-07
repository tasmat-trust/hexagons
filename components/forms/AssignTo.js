import { Button, Checkbox } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MultipleSelect from './MultipleSelect';
import { SingleSelect } from './SingleSelect';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import { allGroups } from '../../queries/Groups';
import { updatePupilGroups } from '../../queries/Pupils';
import { updateTeacherGroups, updateTeacherRole } from '../../queries/Teachers';
import handleStrapiError from '../data-fetching/handleStrapiError';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import { Alert } from '@material-ui/lab';
import roles from '../../utils/roles';
import Loading from '../ui-globals/Loading';

function AssignTo({ selectItems, updateModel, modelname, isGroups }) {
  const [loading, setLoading] = useState(false);
  const [selectValue, setSelectValue] = useState([]);
  const [errorValue, setErrorValue] = useState(false);
  const [successValue, setSuccessValue] = useState(false);
  const [shouldOverwrite, setShouldOverwrite] = useState(false);

  async function handleForm(event) {
    event.preventDefault();
    setLoading(true);
    let formData = {
      shouldOverwrite: shouldOverwrite,
    };
    if (selectItems && isGroups) {
      const groups = event.target['select-multiple-chip'].value.split(',');
      formData.groups = groups;
    }

    if (selectItems && !isGroups) {
      const role = event.target['select-single-chip'].value;
      formData.role = role;
    }

    const formResult = await updateModel(formData);
    if (formResult[0].error) {
      setErrorValue(formResult[0].error);
    } else if (formResult[0].success) {
      resetForm(`${modelname} saved successfully.`);
    }
    setLoading(false);
  }

  function resetForm(message) {
    setSelectValue([]);
    setSuccessValue(message);
    setTimeout(() => {
      setSuccessValue('');
    }, 1500);
  }

  return (
    <form id={`assign-to-${modelname}`} onSubmit={handleForm}>
      {errorValue && (
        <Alert data-test-id="error" severity="error">
          {errorValue}
        </Alert>
      )}
      {successValue && (
        <Alert data-test-id="success" severity="success">
          {successValue}
        </Alert>
      )}
      {loading && <Loading message="Submitting form..." />}
      {!loading && (
        <>
          {selectItems && isGroups && (
            <MultipleSelect
              itemsLabel="Groups"
              selectItems={selectItems}
              selectValue={selectValue}
              setSelectValue={setSelectValue}
            />
          )}
          {selectItems && !isGroups && (
            <SingleSelect
              itemLabel="Roles"
              selectItems={selectItems}
              selectValue={selectValue}
              setSelectValue={setSelectValue}
            />
          )}
          {isGroups && (
            <FormControl margin="normal">
              <FormControlLabel
                margin="normal"
                control={
                  <Checkbox
                    data-test-id="overwrite-groups"
                    checked={shouldOverwrite}
                    onChange={() => setShouldOverwrite(!shouldOverwrite)}
                    name="shouldOverwrite"
                  />
                }
                label="Overwrite existing groups?"
              />
            </FormControl>
          )}
          <FormControl margin="normal">
            <Button
              data-test-id={`assign-to-${modelname}`}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Assign {modelname}
            </Button>
          </FormControl>
        </>
      )}
    </form>
  );
}

function AssignGroupsToUser(props) {
  const { gqlClient } = useContext(HexagonsContext);
  const { userType, variables, selectedUsers, allUsers, triggerSharedState } = props;

  async function handleAssignToGroups(formData) {
    const promises = Promise.all(
      selectedUsers.map(async (userId) => {
        const currentUser = allUsers.filter((user) => parseInt(user.id) === parseInt(userId))[0];
        const newUser = {
          id: currentUser.id,
        };
        if (formData.shouldOverwrite === false) {
          const existingGroupIds = currentUser.groups.map((group) => group.id);
          newUser.groups = formData.groups.concat(existingGroupIds);
        } else {
          newUser.groups = formData.groups;
        }
        const res = await assignToGroups(newUser);
        return res;
      })
    );
    return promises;
  }

  async function assignToGroups(user) {
    const variables = {
      userId: parseInt(user.id),
      groupIds: user.groups.map(group => parseInt(group)),
    };
    try {
      const data = await gqlClient.request(
        userType === 'teacher' ? updateTeacherGroups : updatePupilGroups,
        variables
      );
      if (data) {
        triggerSharedState.update();
        const response = {
          success: true,
        };
        return response;
      }
    } catch (e) {
      return handleStrapiError(e);
    }
  }

  const { data: state } = useSWR([allGroups, variables], { suspense: true });
  return (
    <AssignTo
      {...props}
      selectItems={state.groups}
      updateModel={handleAssignToGroups}
      isGroups={true}
    />
  );
}

function AssignRoleToUser(props) {
  const { gqlClient } = useContext(HexagonsContext);
  const { selectedUsers, allUsers, triggerSharedState } = props;

  async function handleAssignToRoles(formData) {
    const promises = Promise.all(
      selectedUsers.map(async (userId) => {
        const currentUser = allUsers.filter((user) => parseInt(user.id) === parseInt(userId))[0];
        const newUser = {
          id: parseInt(currentUser.id),
        };
        newUser.role = formData.role;
        const res = await assignRole(newUser);
        return res;
      })
    );
    return promises;
  }
  async function assignRole(user) {
    const variables = {
      userId: parseInt(user.id),
      roleId: parseInt(user.role),
    };
    try {
      const data = await gqlClient.request(updateTeacherRole, variables);
      if (data) {
        triggerSharedState.update();
        const response = {
          success: true,
        };
        return response;
      }
    } catch (e) {
      return handleStrapiError(e);
    }
  }

  return (
    <AssignTo {...props} selectItems={roles} updateModel={handleAssignToRoles} isGroups={false} />
  );
}

export { AssignRoleToUser, AssignGroupsToUser };
