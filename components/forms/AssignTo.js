import { Button, Checkbox } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MultipleSelect from "./MultipleSelect";
import { useState } from "react";


export default function AssignTo({ selectItems, updateModel, model }) {

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
    <form id={`assign-to-${model}`} onSubmit={handleForm}>
      {selectItems && <MultipleSelect itemsLabel="Groups" selectItems={selectItems} selectValue={selectValue} setSelectValue={setSelectValue} />}
      <FormControl margin="normal">
        <FormControlLabel margin="normal"
          control={<Checkbox checked={shouldOverwrite} onChange={() => setShouldOverwrite(!shouldOverwrite)} name="shouldOverwrite" />}
          label="Overwrite existing groups?"
        />
      </FormControl>
      <FormControl margin="normal">
        <Button fullWidth type="submit" variant="contained" color="primary">
          Assign {model}
        </Button>
      </FormControl>
    </form>
  )
}