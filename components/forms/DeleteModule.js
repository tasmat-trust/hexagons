import PropTypes from 'prop-types'
import { Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import deleteModule from './handlers/deleteModule'
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import { useContext } from 'react';

function DeleteModule({ setModulesData, currentStage }) {

  const { gqlClient } = useContext(HexagonsContext)

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
  setModulesData: PropTypes.func,
  currentStage: PropTypes.object
}

export default DeleteModule