import { Button, Checkbox } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MultipleSelect from "./MultipleSelect";
import { useContext, useState } from "react";
import useSWR from "swr";
import { allGroups } from "../../queries/Groups";
import { updatePupilGroups } from "../../queries/Pupils"
import { updateTeacherGroups } from "../../queries/Teachers"
import handleStrapiError from "../data-fetching/handleStrapiError"
import { HexagonsContext } from "../data-fetching/HexagonsContext";


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

function AssignGroupsToUser(props) {

  const { gqlClient } = useContext(HexagonsContext)
  const { userType, variables, selectedUsers, allUsers, triggerSharedState } = props
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
      const data = await gqlClient.request(userType === 'teacher' ? updateTeacherGroups : updatePupilGroups, variables)
      if (data) triggerSharedState.update()
    } catch (e) {
      handleStrapiError(e)
      console.error(e)
    }
  }

  const { data: state } = useSWR([allGroups, variables], { suspense: true })
  return (
    <AssignTo {...props} selectItems={state.groups} updateModel={handleAssignToGroups} />
  )
}

export {
  AssignGroupsToUser
}