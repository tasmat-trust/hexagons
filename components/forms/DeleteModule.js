import PropTypes from 'prop-types'
import { Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import deleteModule from './handlers/deleteModule'

function DeleteModule({ gqlClient, setModulesData, currentStage }) {
 
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

DeleteModule.propTypes = {
  gqlClient: PropTypes.object,
  setModulesData: PropTypes.func,
  currentStage: PropTypes.object
}

export default DeleteModule