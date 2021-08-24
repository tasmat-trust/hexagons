import PropTypes from 'prop-types'
import useSharedState from './useSharedState';
import { getModules } from '../../queries/Subjects'

export default function WithModules(WrappedComponent) {
  function WithModules({ getModulesBySubjectIdVariables, isAdmin, pupil, subjectId, ...other }) {
    const [modulesData, setModulesData, error] = useSharedState([getModules, getModulesBySubjectIdVariables])
    let modules = []
    if (modulesData) {
      modules = modulesData.modules
    }
    return (
      <>
        {modules.length > 0 && !isAdmin && <WrappedComponent
          competenciesVars={{ pupilId: pupil.id, subjectId: subjectId }}
          setModulesData={setModulesData}
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