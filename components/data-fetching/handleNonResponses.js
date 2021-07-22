import { Typography } from "@material-ui/core"
import Loading from '../ui-globals/Loading'

export default function handleNonResponses(state, error) {
  if (error) return <Typography>Error loading</Typography>
  if (!state) return <Loading message="Loading data" />
  if (state[Object.keys(state)[0]].length === 0) return <Typography>No records found.</Typography>
  return false
}