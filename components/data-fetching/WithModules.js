import PropTypes from 'prop-types';
import { getModules } from '../../queries/Subjects';
import useSWR from 'swr';
import { sortByOrder } from '../../utils/sortLevelsAndModules';

export default function WithModules(WrappedComponent) {
  function WithModules({ getModulesBySubjectIdVariables, pupil, subjectId, ...other }) {
    const { data: modulesData, mutate: setModulesData } = useSWR([
      getModules,
      getModulesBySubjectIdVariables,
    ]);
    let modules = [];
    if (modulesData) {
      modulesData.modules.forEach(module => {
        const capabilities = module.capabilities
        if (capabilities) {
          let sortedCapabilities = sortByOrder(capabilities)
          module.capabilities = sortedCapabilities
        }
      });
      modules = modulesData.modules;
    }
 
    return (
      <WrappedComponent
        modules={modules}
        pupil={pupil}
        subjectId={subjectId}
        setModulesData={setModulesData}
        {...other}
      />
    );
  }

  WithModules.propTypes = {
    getModulesBySubjectIdVariables: PropTypes.object,
    pupil: PropTypes.object,
    subjectId: PropTypes.number,
  };
  return WithModules;
}
