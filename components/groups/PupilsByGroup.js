

import { getPupilsByGroup } from "../../queries/Pupils"

import useSharedState from "../data-fetching/useSharedState";
import handleNonResponses from "../data-fetching/handleNonResponses";

import { Grid } from "@material-ui/core";
import PupilCard from "../pupil/PupilCard";
import WithGroupFromSlug from "./WithGroupFromSlug";



function PupilsByGroup(props) {
  const { variables, groupSlug } = props
  const [pupilsData, setPupilsData, error] = useSharedState([getPupilsByGroup, variables])
  const gotNonResponse = handleNonResponses(pupilsData, error)
  if (gotNonResponse) return gotNonResponse
  return (
    <>
      <Grid container spacing={3}>
        {pupilsData.pupils.map((p, i) => (
          <Grid key={`pupil-${i}`} item xs={4}>
            <PupilCard {...props} key={i} pupil={p} onwardHref={`/groups/${groupSlug}/${p.id}`} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default WithGroupFromSlug(PupilsByGroup)