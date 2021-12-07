import PropTypes from 'prop-types'
import useSWR from 'swr'
import { getSingleSubjectBySlug } from "../../queries/Subjects"
export default function WithEarlyDevelopmentFromSlug(WrappedComponent) {
  function WithEarlyDevelopmentFromSlug({ getEarlyDevelopmentBySlugVariables, ...other }) {
    const { data: edData } = useSWR([getSingleSubjectBySlug, getEarlyDevelopmentBySlugVariables], { suspense: true })
    const ed = edData.subjects[0]
    const edSubjectId = parseInt(ed.id)
    return (
      <>
        <WrappedComponent
          {...other}
          edSubjectId={edSubjectId}
          getEdModulesBySubjectIdVariables={{ subjectId: edSubjectId }} />
      </>
    )
  }

  WithEarlyDevelopmentFromSlug.propTypes = {
    getSubjectBySlugVariables: PropTypes.object
  }

  return WithEarlyDevelopmentFromSlug
}

