import { Typography } from "@material-ui/core"

export default function handleNonResponses(state, error) {
  if (error) return <Typography>Error loading</Typography>
  if (!state) return <Typography>Loading</Typography>
  if (state[Object.keys(state)[0]].length === 0) return <Typography>No records found.</Typography>
  return false
}