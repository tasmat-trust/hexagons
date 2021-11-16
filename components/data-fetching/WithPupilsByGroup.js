import PropTypes from 'prop-types';
import useSWR from 'swr';
import { getPupilsByGroup } from '../../queries/Pupils';

export default function WithPupilsByGroup(WrappedComponent) {
  function WithPupilsByGroup({ pupilsByGroupVariables, ...other }) {
    const { data: pupilsData } = useSWR([getPupilsByGroup, pupilsByGroupVariables], {
      suspense: true,
    });
    let pupils = pupilsData.pupils;

    return <WrappedComponent pupils={pupils} {...other} />;
  }

  WithPupilsByGroup.propTypes = {
    pupilsByGroupVariables: PropTypes.object,
  };

  return WithPupilsByGroup;
}
