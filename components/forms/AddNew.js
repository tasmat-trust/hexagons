import { TextField, Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';

import MultipleSelect from "./MultipleSelect";
import { useState } from "react";


export default function AddNew({ updateModel, model, selectItems }) {

  const [selectValue, setSelectValue] = useState([]);
  const [nameValue, setNameValue] = useState('');

  function handleForm(event) {
    event.preventDefault()
    let formData = {
      name: event.target['name'].value,
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
    setNameValue('')
  }

  return (
    <form id={`new-${model}`} onSubmit={handleForm}>
      <FormControl fullWidth required margin="normal">
        <TextField
          id="name"
          label="Name"
          value={nameValue}
          required
          onChange={(event) => setNameValue(event.target.value)}
        />
      </FormControl>
      {selectItems && <MultipleSelect itemsLabel="Groups" selectItems={selectItems} selectValue={selectValue} setSelectValue={setSelectValue} />}
      <FormControl margin="normal">
        <Button fullWidth type="submit" variant="contained" color="primary">
          Add new {model}
        </Button>
      </FormControl>
    </form>
  )
}