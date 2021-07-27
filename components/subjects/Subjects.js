import { Box } from "@material-ui/core"
import { allSubjects } from '../../queries/Subjects'
import useStateOnce from '../data-fetching/useStateOnce'
import handleNonResponses from "../data-fetching/handleNonResponses"
import SubjectTiles from "../subjects/SubjectTiles"

function Subjects(props) {

  const [subjectsData, error] = useStateOnce(allSubjects)
  const gotNonResponse = handleNonResponses(subjectsData, error)
  if (gotNonResponse) return gotNonResponse
  return (
    <>
      <Box>
        <SubjectTiles subjects={subjectsData.subjects} onwardHref={props.onwardHref} />
      </Box>
    </>
  )
}

export default Subjects