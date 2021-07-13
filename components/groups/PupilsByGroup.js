
import { getSingleGroup } from "../../queries/Groups";
import { getPupilsByGroup } from "../../queries/Pupils"

import useSharedState from "../data-fetching/useSharedState";
import handleNonResponses from "../data-fetching/handleNonResponses";

import { Grid } from "@material-ui/core";
import PupilCard from "../pupil/PupilCard";

function GroupFromSlug(PupilsByGroup) {
  return function GroupFromSlug(props) {
    const { variables } = props
    const [groupsData, setGroupsData, error] = useSharedState([getSingleGroup, variables])
    const gotNonResponse = handleNonResponses(groupsData, error)
    if (gotNonResponse) return gotNonResponse
    const groupId = groupsData.groups[0].id
    return <PupilsByGroup {...props} variables={{ groupId: groupId }} />
  }
}

function PupilsByGroup(props) {
  const {variables} = props
  const [pupilsData, setPupilsData, error] = useSharedState([getPupilsByGroup, variables])
  const gotNonResponse = handleNonResponses(pupilsData, error)
  if (gotNonResponse) return gotNonResponse
  return (
    <>
      <p>Pupils</p>
      <Grid container spacing={3}>
        {pupilsData.pupils.map((p, i) => (
          <Grid key={`pupil-${i}`} item xs={4}>
            <PupilCard {...props} key={i} pupil={p} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default GroupFromSlug(PupilsByGroup)