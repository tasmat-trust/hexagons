import { TextField, Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';

import MultipleSelect from "./MultipleSelect";
import { useState } from "react";
import useSWR from "swr"

// Utils
import { getOrgIdFromSession } from '../../utils';


import { Typography } from "@material-ui/core";


import { session } from "next-auth/client";

function AddNew({ updateModel, model, nameFieldName, includeEmail, selectItems }) {

  const [selectValue, setSelectValue] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  function handleForm(event) {
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
    //updateModel(formData)
    resetForm()
  }

  function resetForm() {
    setSelectValue([])
    setNameValue('')
    setEmailValue('')
  }

  return (
    <form id={`new-${model}`} onSubmit={handleForm}>
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
        <Button data-test-id={`add-new-${model}`} fullWidth type="submit" variant="contained" color="primary">
          Add new {model}
        </Button>
      </FormControl>
    </form>
  )
}

function AddNewGroup(props) {
  const { query, variables } = props
  const { data, error } = useSWR([query, variables])
  if (error) return <Typography>There has been an error fetching the data</Typography>
  if (!data) return <Typography>Loading</Typography>
  if (data[Object.keys(data)[0]].length === 0) return <Typography>No records found.</Typography>
  return (
    <AddNew {...props} selectItems={data.groups} />
  )
}

export {
  AddNewGroup
}