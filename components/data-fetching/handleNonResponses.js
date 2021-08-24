import PropTypes from 'prop-types'
import { Typography } from "@material-ui/core"
import Loading from '../ui-globals/Loading'

function handleNonResponses(state, error, errorMessage, loadingTestId) {
  if (error) {
    let message = 'Error loading'
    if (error.response && error.response.errors && error.response.errors.length > 0) {
      message = error.response.errors[0].message
    }
    return <Typography>{message}</Typography>
  }
  if (!state) return <Loading message="Loading data" testId={loadingTestId ? loadingTestId : 'loading'} />
  if (state[Object.keys(state)[0]].length === 0) return <Typography>{errorMessage ? errorMessage : 'No records found'}</Typography>
  return false
}

handleNonResponses.propTypes = {
  state: PropTypes.object,
  error: PropTypes.object,
  errorMessage: PropTypes.string,
  loadingTestId: PropTypes.string
}

export default handleNonResponses
