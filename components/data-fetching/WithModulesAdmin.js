import PropTypes from 'prop-types';
import { getModules } from '../../queries/Subjects';
import useSWR from 'swr';

export default function WithModules(WrappedComponent) {
  function WithModules({ getModulesBySubjectIdVariables, subjectId, ...other }) {
    const { data: modulesData, mutate: setModulesData } = useSWR(
      [getModules, getModulesBySubjectIdVariables],
      { suspense: true }
    );
    let modules = modulesData.modules;
    return (
      <WrappedComponent
        setModulesData={setModulesData}
        modules={modules}
        subjectId={subjectId}
        {...other}
      />
    );
  }
  WithModules.propTypes = {
    getModulesBySubjectIdVariables: PropTypes.object,
    subjectId: PropTypes.number,
  };
  return WithModules;
}
