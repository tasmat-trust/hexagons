import { Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import { deleteCapabilities, deleteStage } from './handlers/deleteModule'


function DeleteCapabilities(props) {
  const { gqlClient, setModulesData, currentStage } = props
  async function handleForm(event) {
    event.preventDefault()
    await deleteCapabilities(gqlClient, currentStage, setModulesData)
  }

  return (
    <form id={`new-module`} onSubmit={handleForm}>
      <FormControl margin="normal">
        <Button data-test-id={`delete-module`} fullWidth type="submit" variant="contained" color="primary">
          Delete all capabilities
        </Button>
      </FormControl>
    </form>
  )
}

function DeleteStage(props) {
  const { gqlClient, setModulesData, currentStage } = props
  async function handleForm(event) {
    event.preventDefault()
    await deleteCapabilities(gqlClient, currentStage, setModulesData)
    await deleteStage(gqlClient, currentStage, setModulesData)
  }

  return (
    <form id={`new-module`} onSubmit={handleForm}>
      <FormControl margin="normal">
        <Button data-test-id={`delete-module`} fullWidth type="submit" variant="contained" color="primary">
          Delete module
        </Button>
      </FormControl>
    </form>
  )
}


export {
  DeleteCapabilities,
  DeleteStage
}