import PropTypes from 'prop-types'
import useStateOnce from "./useStateOnce"
import handleNonResponses from "./handleNonResponses"
import { getSingleSubjectBySlug } from "../../queries/Subjects"

export default function WithSingleSubjectFromSlug(WrappedComponent) {
  function WithSingleSubjectFromSlug({ getSubjectBySlugVariables, ...other }) {
    const [subjectData, error] = useStateOnce([getSingleSubjectBySlug, getSubjectBySlugVariables])
    const gotNonResponse = handleNonResponses(subjectData, error)
    if (gotNonResponse) return gotNonResponse
    const subjectId = subjectData.subjects[0].id
    const subjectName = subjectData.subjects[0].name
    return (
      <>
        <WrappedComponent
          {...other}
          subjectId={subjectId}
          subjectName={subjectName}
          getModulesBySubjectIdVariables={{ subjectId: subjectId }} />
      </>
    )
  }

  WithSingleSubjectFromSlug.propTypes = {
    getSubjectBySlugVariables: PropTypes.object
  }

  return WithSingleSubjectFromSlug
}

