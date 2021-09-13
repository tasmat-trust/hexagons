import PropTypes from 'prop-types'
import { getModules } from '../../queries/Subjects'
import useSWR from 'swr';

export default function WithModules(WrappedComponent) {
  function WithModules({ getModulesBySubjectIdVariables, isAdmin, pupil, subjectId, ...other }) {
    const { data: modulesData, mutate: setModulesData } = useSWR([getModules, getModulesBySubjectIdVariables], { suspense: true })
    let modules = modulesData.modules

    return (
      <>
        {modules.length > 0 && !isAdmin && <WrappedComponent
          competenciesVars={{ pupilId: parseInt(pupil.id), subjectId: parseInt(subjectId) }}
          modules={modules}
          pupil={pupil}
          isAdmin={isAdmin}
          subjectId={subjectId}
          {...other} />}

        {isAdmin && <WrappedComponent
          setModulesData={setModulesData}
          modules={modules}
          upil={pupil}
          isAdmin={isAdmin}
          subjectId={subjectId}
          {...other} />}
      </>
    )
  }
  WithModules.propTypes = {
    getModulesBySubjectIdVariables: PropTypes.object,
    isAdmin: PropTypes.bool,
    pupil: PropTypes.object,
    subjectId: PropTypes.string
  }
  return WithModules
}
