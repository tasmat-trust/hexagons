import PropTypes from 'prop-types'
import { getModules } from '../../queries/Subjects'
import useSWR from 'swr';

export default function WithEarlyDevelopmentModule(WrappedComponent) {
  function WithEarlyDevelopmentModule({ getEdModulesBySubjectIdVariables, modules, pupil, edSubjectId, ...other }) {
    const { data: edModulesData, mutate: setEdModulesData } = useSWR([getModules, getEdModulesBySubjectIdVariables], { suspense: true })
    let module = edModulesData.modules[0]
    module.isEd = true
    const mergedModules = [module, ...modules]
    return <WrappedComponent
      edCompetenciesVars={{ pupilId: parseInt(pupil.id), subjectId: parseInt(edSubjectId) }}
      edModule={module}
      pupil={pupil}
      edSubjectId={edSubjectId}
      modules={mergedModules}
      setEdModulesData={setEdModulesData}
      {...other} />
  }

  WithEarlyDevelopmentModule.propTypes = {
    modules: PropTypes.array,
    getEdModulesBySubjectIdVariables: PropTypes.object,
    pupil: PropTypes.object,
    edSubjectId: PropTypes.string
  }
  return WithEarlyDevelopmentModule
}
