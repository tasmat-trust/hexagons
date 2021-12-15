import PropTypes from 'prop-types'
import { Button } from "@mui/material"
import FormControl from '@mui/material/FormControl';
import deletePupilCompletely from './handlers/deletePupilCompletely'
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import { useContext } from 'react';
import Loading from '../ui-globals/Loading';
import { Alert } from '@mui/material';
import { useState } from 'react';

function DeletePupil({ pupilId, triggerSharedState }) {

  const { gqlClient } = useContext(HexagonsContext)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  async function handleForm(event) {
    setLoading(true)
    event.preventDefault()
    try {
      await deletePupilCompletely(gqlClient, pupilId, triggerSharedState)
      setSuccess(true)
    } catch (e) {
      setError(true)
    }
    setLoading(false)

  }

  return (
    <form id={`delete-pupil`} onSubmit={handleForm}>
      <FormControl margin="normal">
        {loading && <Loading message="Deleting pupil" />}
        {success && <Alert>Pupil deleted successfully</Alert>}
        {error && <Alert severity="error">Error deleting pupil. Please refresh and try again.</Alert>}
        {!loading && (<Button data-test-id={`definitely-delete-pupil`} fullWidth type="submit" variant="contained" color="primary">
          Delete pupil
        </Button>)}
      </FormControl>
    </form>
  )
}

DeletePupil.propTypes = {
  triggerSharedState: PropTypes.func,
  currentStage: PropTypes.object
}

export default DeletePupil