import { TextField, Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';

import MultipleSelect from "./MultipleSelect";
import { useState } from "react";


import useSharedState from "../data-fetching/useSharedState";
import handleNonResponses from "../data-fetching/handleNonResponses"
import { allGroups } from '../../queries/Groups'

import createPupil from '../../handlers/createPupil'
import createTeacher from '../../handlers/createTeacher'
import createGroup from '../../handlers/createGroup'

import { Typography } from "@material-ui/core";

function AddNew(props) {
  const { updateHandler, modelName, triggerSharedState, nameFieldName, includeEmail, selectItems, gqlClient } = props
  const [selectValue, setSelectValue] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  async function handleForm(event) {
    event.preventDefault()
    let formData = {}

    if (event.target['email']) {
      formData.email = event.target['email'].value
    }
    if (event.target['username']) {
      formData.username = event.target['username'].value
    }
    if (event.target['name']) {
      formData.name = event.target['name'].value
    }
    if (selectItems) {
      const groups = event.target['select-multiple-chip'].value.split(',');
      formData.groups = groups;
    }
    await updateHandler(formData, gqlClient, props.session.orgId, triggerSharedState)
    resetForm()
  }

  function resetForm() {
    setSelectValue([])
    setNameValue('')
    setEmailValue('')
  }

  return (
    <form id={`new-${modelName}`} onSubmit={handleForm}>
      <FormControl fullWidth required margin="normal">
        <TextField
          id={nameFieldName ? nameFieldName : 'name'}
          label="Name"
          value={nameValue}
          required
          onChange={(event) => setNameValue(event.target.value)}
        />
      </FormControl>
      {includeEmail && (
        <FormControl fullWidth required margin="normal">
          <TextField
            id="email"
            label="Email address"
            value={emailValue}
            required
            onChange={(event) => setEmailValue(event.target.value)}
          />
        </FormControl>
      )}
      {selectItems && <MultipleSelect itemsLabel="Groups" selectItems={selectItems} selectValue={selectValue} setSelectValue={setSelectValue} />}
      <FormControl margin="normal">
        <Button data-test-id={`add-new-${modelName}`} fullWidth type="submit" variant="contained" color="primary">
          Add new {modelName}
        </Button>
      </FormControl>
    </form>
  )
}

function AddNewGroup(props) {
  return (
    <AddNew
      {...props}
      updateHandler={createGroup}
      modelName={"group"}
      nameFieldName={'name'}
    />
  )
}


function AddNewUserWithGroups(props) {
  const { variables, userType } = props
  const [state, setState, error] = useSharedState([allGroups, variables])
  const gotNonResponse = handleNonResponses(state, error)
  if (gotNonResponse) return gotNonResponse
  return (
    <>
      {userType === 'teacher' && <AddNew
        {...props}
        modelName="user"
        updateHandler={createTeacher}
        nameFieldName={'username'}
        includeEmail={true}
        selectItems={state.groups} />}
      {userType === 'pupil' && <AddNew
        {...props}
        modelName="pupil"
        updateHandler={createPupil}
        nameFieldName={'name'}
        selectItems={state.groups} />}
    </>
  )
}

export {
  AddNewUserWithGroups,
  AddNewGroup
}