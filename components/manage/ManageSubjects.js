import { Box } from "@material-ui/core"
import { allSubjects } from '../../queries/Subjects'
import useSharedState from "../data-fetching/useSharedState"
import handleNonResponses from "../data-fetching/handleNonResponses"
import SubjectTiles from "../subjects/SubjectTiles"

function ManageSubjects(props) {

  const [subjectsData, setSubjectsData, error] = useSharedState(allSubjects)
  const gotNonResponse = handleNonResponses(subjectsData, error)
  if (gotNonResponse) return gotNonResponse

  return (
    <>
      <Box>        
        <SubjectTiles subjects={subjectsData.subjects} />
      </Box>
    </>
  )
}

export default ManageSubjects