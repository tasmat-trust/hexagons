import { Grid } from "@material-ui/core"
import PupilCard from "./PupilCard"
import { allPupilsWithGroups } from "../../queries/Pupils"

import useSharedState from "../data-fetching/useSharedState"
import handleNonResponses from "../data-fetching/handleNonResponses"

function PupilsList(props) {
  const { variables } = props
  const [pupilsData, setPupilsData, error] = useSharedState([allPupilsWithGroups, variables])
  const gotNonResponse = handleNonResponses(pupilsData, error)
  if (gotNonResponse) return gotNonResponse
  return (
    <>
      <Grid container spacing={3}>
        {pupilsData.pupils.map((p, i) => (
          <Grid key={`pupil-${i}`} item xs={4}>
            <PupilCard {...props} key={i} pupil={p} onwardHref={`/pupils/${p.id}`} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default PupilsList