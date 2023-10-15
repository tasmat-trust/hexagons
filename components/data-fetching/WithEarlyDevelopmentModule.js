import PropTypes from 'prop-types';
import { getEdModules } from '../../queries/Subjects';
import useSWR from 'swr';

export default function WithEarlyDevelopmentModule(WrappedComponent) {
  function WithEarlyDevelopmentModule({
    getEdModulesBySubjectIdVariables,
    pupilId,
    modules,
    edSubjectId,
    ...other
  }) {
    const { data: edModulesData } = useSWR([getEdModules, getEdModulesBySubjectIdVariables], {
      suspense: true,
    });
    let module = edModulesData.modules[0];
    module.isTransition = true;
    let mergedModules = [];
    if (modules && modules.length > 0) {
      mergedModules = [module, ...modules];
    } else {
      mergedModules.push(module);
    }

    return (
      <WrappedComponent
        edModule={module}
        edSubjectId={edSubjectId}
        pupilId={pupilId}
        getEdLevelVariables={{
          subjectId: edSubjectId,
          moduleId: parseInt(module.id),
          pupilId: pupilId,
        }}
        modules={mergedModules}
        {...other}
      />
    );
  }

  WithEarlyDevelopmentModule.propTypes = {
    modules: PropTypes.array,
    getEdModulesBySubjectIdVariables: PropTypes.object,
    edSubjectId: PropTypes.number,
  };
  return WithEarlyDevelopmentModule;
}
