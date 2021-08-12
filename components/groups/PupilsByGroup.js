

import { getPupilsByGroup } from "../../queries/Pupils"

import useSharedState from "../data-fetching/useSharedState";
import useStateOnce from "../data-fetching/useStateOnce";
import handleNonResponses from "../data-fetching/handleNonResponses";
import { getCoreSubjects } from "../../queries/Subjects"
import { Grid } from "@material-ui/core";
import PupilCard from "../pupil/PupilCard";
import WithGroupFromSlug from "./WithGroupFromSlug";


function WithCoreSubjects(WrappedComponent) {
  return function WithCoreSubjects(props) {
    const [subjectsData, error] = useStateOnce([getCoreSubjects])
    const gotNonResponse = handleNonResponses(subjectsData, error)
    if (gotNonResponse) return gotNonResponse
    return (
      <>
        {subjectsData.subjects && <WrappedComponent coreSubjects={subjectsData.subjects} {...props} />}
      </>
    )
  }
}


function PupilsByGroup(props) {
  const { variables, groupSlug } = props
  const [pupilsData, setPupilsData, error] = useSharedState([getPupilsByGroup, variables])
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