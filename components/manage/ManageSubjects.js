import { Box, Typography } from "@material-ui/core"
import { allSubjects } from '../../queries/Subjects'
import useSharedState from "../data-fetching/useSharedState"
import handleNonResponses from "../data-fetching/handleNonResponses"
import Link from "next/link"

function ManageSubjects(props) {

  const { classes } = props

  const [state, setState, error] = useSharedState(allSubjects)
  const gotNonResponse = handleNonResponses(state, error)
  if (gotNonResponse) return gotNonResponse

  return (
    <>
      <Box className={classes.box}>
        <Typography variant="h4" component="h2" className={classes.title} data-test-id="title">All subjects</Typography>
        {state.subjects.map((subject, i) => {
          return (
            <Link href={`/manage/subjects/${subject.slug}`} key={`subject-${i}`}>{subject.name}</Link>
          )
        })}

      </Box >
    </>
  )
}

export default ManageSubjects