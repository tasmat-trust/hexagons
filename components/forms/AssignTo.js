import { Button, Checkbox } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MultipleSelect from "./MultipleSelect";
import { useState } from "react";
import useSharedState from "../data-fetching/useSharedState";
import handleNonResponses from "../data-fetching/handleNonResponses";
import { allGroups } from "../../queries/Groups";
import { updatePupilGroups } from "../../queries/Pupils"



function AssignTo({ selectItems, updateModel, modelname }) {

  const [selectValue, setSelectValue] = useState([]);
  const [shouldOverwrite, setShouldOverwrite] = useState(false)

  function handleForm(event) {
    event.preventDefault()
    let formData = {
      shouldOverwrite: shouldOverwrite
    }
    if (selectItems) {
      const groups = event.target['select-multiple-chip'].value.split(',');
      formData.groups = groups;
    }

    updateModel(formData)
    resetForm()
  }

  function resetForm() {
    setSelectValue([])
  }

  return (
    <form id={`assign-to-${modelname}`} onSubmit={handleForm}>
      {selectItems && <MultipleSelect itemsLabel="Groups" selectItems={selectItems} selectValue={selectValue} setSelectValue={setSelectValue} />}
      <FormControl margin="normal">
        <FormControlLabel margin="normal"
          control={<Checkbox checked={shouldOverwrite} onChange={() => setShouldOverwrite(!shouldOverwrite)} name="shouldOverwrite" />}
          label="Overwrite existing groups?"
        />
      </FormControl>
      <FormControl margin="normal">
        <Button data-test-id={`assign-to-${modelname}`} fullWidth type="submit" variant="contained" color="primary">
          Assign {modelname}
        </Button>
      </FormControl>
    </form>
  )
}

function AssignGroupsToPupil(props) {

  const { variables, gqlClient, selectedUsers, allUsers, triggerSharedState } = props
  function handleAssignToGroups(formData) {
    selectedUsers.map(userId => {
      const currentUser = allUsers.filter(user => user.id === userId)[0]
      const newUser = {
        id: currentUser.id
      }
      if (formData.shouldOverwrite === false) {
        const existingGroupIds = currentUser.groups.map(group => group.id)
        newUser.groups = formData.groups.concat(existingGroupIds)
      } else {
        newUser.groups = formData.groups
      }

      assignToGroups(newUser)
      return newUser
    })
  }

  async function assignToGroups(user) {
    const variables = {
      userId: user.id,
      groupIds: user.groups
    }
    try {
      const data = await gqlClient.request(updatePupilGroups, variables)
      if (data) triggerSharedState.update()
    } catch (e) {
      console.error(e)
    }
  }


  const [state, setState, error] = useSharedState([allGroups, variables])
  const gotNonResponse = handleNonResponses(state, error)
  const groups = gotNonResponse ? [] : state.groups
  return (
    <AssignTo {...props} selectItems={groups} updateModel={handleAssignToGroups} />
  )
}

export {
  AssignGroupsToPupil
}