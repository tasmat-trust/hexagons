import PropTypes from 'prop-types'
import useStateOnce from "./useStateOnce"
import handleNonResponses from "./handleNonResponses"
import { getSingleSubjectBySlug } from "../../queries/Subjects"

export default function WithSingleSubjectFromSlug(WrappedComponent) {
  function WithSingleSubjectFromSlug({ getSubjectBySlugVariables, ...other }) {
    const [subjectData, error] = useStateOnce([getSingleSubjectBySlug, getSubjectBySlugVariables])
    const gotNonResponse = handleNonResponses(subjectData, error)
    if (gotNonResponse) return gotNonResponse
    const subject = subjectData.subjects[0]
    const subjectId = subject.id
    const subjectName = subject.name
    const subjectSlug = subject.slug  
    return (
      <>
        <WrappedComponent
          {...other}
          subjectId={subjectId}
          subjectName={subjectName}
          subjectSlug={subjectSlug}
          getModulesBySubjectIdVariables={{ subjectId: subjectId }} />
      </>
    )
  }

  WithSingleSubjectFromSlug.propTypes = {
    getSubjectBySlugVariables: PropTypes.object
  }

  return WithSingleSubjectFromSlug
}

