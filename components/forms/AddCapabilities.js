import PropTypes from 'prop-types'
import { TextField, Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import createModule from '../forms/handlers/createModule'
import { MenuItem, Select, InputLabel } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  top: {
    marginTop: theme.spacing(3)
  },
  input: {
    marginTop: theme.spacing(1)
  }
}))

function AddCapabilities({ gqlClient, setModulesData, subjectId }) {

  const [capabilitiesValue, setCapabilitiesValue] = useState('');
  const [orderValue, setOrderValue] = useState('');
  const [levelValue, setLevelValue] = useState('');
  const [summaryValue, setSummaryValue] = useState('');
  const [guidanceValue, setGuidanceValue] = useState('');
  const classes = styles()
  if (!subjectId) throw new Error('no subject id')

  async function handleForm(event) {
    event.preventDefault()
    let formData = {}

    formData.subjectId = subjectId

    if (orderValue) {
      formData.order = orderValue
    }
    if (summaryValue) {
      formData.summary = summaryValue
    }
    if (guidanceValue) {
      formData.guidance = guidanceValue
    }
    if (levelValue) {
      let level = levelValue === 'Step' ? 'step' : 'stage'
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

  function resetForm() {
    setOrderValue('')
    setSummaryValue('')
    setGuidanceValue('')
    setCapabilitiesValue('')
  }

  return (

    <form id={`new-module`} onSubmit={handleForm}>


      <FormControl className={classes.top} fullWidth variant='outlined'>
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
      </FormControl>

      <TextField
        id="order"
        className={classes.input}
        label={`${levelValue ? levelValue : 'Step / Stage'} number`}
        value={orderValue}
        required
        fullWidth
        variant='outlined'
        onChange={(event) => setOrderValue(event.target.value)}
      />

      <TextField
        className={classes.input}
        id="summary"
        label="Summary"
        value={summaryValue}
        fullWidth={true}
        multiline={true}
        maxRows='20'
        rows='2'
        variant='outlined'
        onChange={(event) => setSummaryValue(event.target.value)}
      />

      <TextField
        className={classes.input}
        id="guidance"
        label="Guidance"
        value={guidanceValue}
        fullWidth={true}
        multiline={true}
        maxRows='20'
        rows='5'
        variant='outlined'
        onChange={(event) => setGuidanceValue(event.target.value)}
      />



      <TextField
        className={classes.input}
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
          Add new {levelValue ? levelValue : 'module'}
        </Button>
      </FormControl>
    </form>

  )
}

AddCapabilities.propTypes = {
  gqlClient: PropTypes.object,
  setModulesData: PropTypes.func,
  subjectId: PropTypes.string
}

export default AddCapabilities
