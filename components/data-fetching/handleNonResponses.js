import { Typography } from "@material-ui/core"
import Loading from '../ui-globals/Loading'

export default function handleNonResponses(state, error, errorMessage) {
  if (error) {
    let message = 'Error loading'
    if (error.response && error.response.errors && error.response.errors.length > 0) {
      message = error.response.errors[0].message
    }
    return <Typography>{message}</Typography>
  }
  if (!state) return <Loading message="Loading data" />
  if (state[Object.keys(state)[0]].length === 0) return <Typography>{errorMessage ? errorMessage : 'No records found'}</Typography>
  return false
}