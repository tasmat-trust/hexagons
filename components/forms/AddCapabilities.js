import { TextField, Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import createModule from '../forms/handlers/createModule'
import { MenuItem, Select, InputLabel } from "@material-ui/core";
import { useState } from "react";



export default function AddCapabilities(props) {
  const { gqlClient, setModulesData, currentStage, setCurrentStage, subjectId } = props
  const [capabilitiesValue, setCapabilitiesValue] = useState('');
  const [orderValue, setOrderValue] = useState('');
  const [levelValue, setLevelValue] = useState('');

  async function handleForm(event) {
    event.preventDefault()
    let formData = {}

    formData.subjectId = subjectId

    if (orderValue) {
      formData.order = orderValue
    }
    if (levelValue) {
      let level = levelValue === 'Step' ? 'step' : 'stage'
      console.log(level)
      formData.level = level
    }

    if (capabilitiesValue) {
      formData.capabilities = capabilitiesValue
    }
    await createModule(formData, gqlClient, setModulesData)
    resetForm()
  }

  function handleSelectChange(event) {
    setLevelValue(event.target.value)
  }

  function handleCreateNewStepStage() {
    setCurrentStage(null)
  }

  function resetForm() {
    setOrderValue('')   
    setCapabilitiesValue('')
    //setLevelValue('')
  }

  return (

    <form id={`new-module`} onSubmit={handleForm}>

      {currentStage && <Button data-test-id={`add-new-stage-step`} onClick={handleCreateNewStepStage}  variant="contained" color="secondary">
        Create new stage/step
      </Button>}

      {!currentStage && <FormControl fullWidth variant='outlined'>
        <InputLabel id="select-level">Level</InputLabel>
        <Select
          labelId="select-level"
          id="level"
          value={levelValue}
          onChange={handleSelectChange}
        >
          <MenuItem value='Step'>Step</MenuItem>
          <MenuItem value='Stage'>Stage</MenuItem>
        </Select>
      </FormControl>}

      {!currentStage && <TextField
        id="order"
        label={`${levelValue ? levelValue : 'Step / Stage'} number`}
        value={orderValue}
        required
        fullWidth
        margin="normal"
        variant='outlined'
        onChange={(event) => setOrderValue(event.target.value)}
      />}

      <TextField
        id="capabilities"
        label="Capabilities"
        value={capabilitiesValue}
        fullWidth={true}
        multiline={true}
        maxRows='20'
        rows='20'
        variant='outlined'
        onChange={(event) => setCapabilitiesValue(event.target.value)}
      />

      <FormControl margin="normal">
        <Button data-test-id={`add-new-module`} fullWidth type="submit" variant="contained" color="primary">
          Add new module
        </Button>
      </FormControl>
    </form>

  )
}
