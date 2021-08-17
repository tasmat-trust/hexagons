

import { getPupilsByGroup } from "../../queries/Pupils"

import useSharedState from "../data-fetching/useSharedState"; 
import handleNonResponses from "../data-fetching/handleNonResponses";

import { Grid } from "@material-ui/core";
import PupilCard from "../pupil/PupilCard";
import WithGroupFromSlug from "../data-fetching/WithGroupFromSlug";
import WithCoreSubjects from "../data-fetching/WithCoreSubjects";


function PupilsByGroup(props) {
  const { pupilsByGroupVariables, groupSlug } = props
  const [pupilsData, setPupilsData, error] = useSharedState([getPupilsByGroup, pupilsByGroupVariables])
  const gotNonResponse = handleNonResponses(pupilsData, error)
  if (gotNonResponse) return gotNonResponse
  return (
    <>
      <Grid container spacing={3}>
        {pupilsData.pupils.map((p, i) => (
          <Grid key={`pupil-${i}`} item xs={12} md={6} lg={4} sm={6} xl={3}>
            <PupilCard {...props} key={i} pupil={p} onwardHref={`/pupils/${groupSlug}/${p.id}`} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default WithCoreSubjects(WithGroupFromSlug(PupilsByGroup))