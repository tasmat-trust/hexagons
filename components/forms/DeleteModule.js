import { Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import deleteModule from './handlers/deleteModule'

export default function DeleteModule(props) {
  const { gqlClient, setModulesData, currentStage } = props
  async function handleForm(event) {
    event.preventDefault()
    await deleteModule(gqlClient, currentStage, setModulesData)
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
