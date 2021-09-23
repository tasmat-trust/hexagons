import PropTypes from 'prop-types'
import { getModules } from '../../queries/Subjects'
import useSWR from 'swr';

export default function WithEarlyDevelopmentModule(WrappedComponent) {
  function WithEarlyDevelopmentModule({ getEdModulesBySubjectIdVariables, modules, edSubjectId, ...other }) {
    const { data: edModulesData } = useSWR([getModules, getEdModulesBySubjectIdVariables], { suspense: true })
    let module = edModulesData.modules[0]
    module.isEd = true
    const mergedModules = [module, ...modules]
    return <WrappedComponent
      edModule={module}
      edSubjectId={edSubjectId}
      modules={mergedModules}
      {...other} />
  }

  WithEarlyDevelopmentModule.propTypes = {
    modules: PropTypes.array,
    getEdModulesBySubjectIdVariables: PropTypes.object,
    edSubjectId: PropTypes.string
  }
  return WithEarlyDevelopmentModule
}
