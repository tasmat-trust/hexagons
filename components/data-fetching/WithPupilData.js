import PropTypes from 'prop-types';
import useSWR from 'swr'
import { getPupilById } from '../../queries/Pupils';

export default function WithPupilData(WrappedComponent) {
  function WithPupilData({ pupilVariables, subjectId, ...other }) {
    const { data: pupilsData } = useSWR([getPupilById, pupilVariables], { suspense: true });
    const pupil = pupilsData.pupils[0];
    return (
      <WrappedComponent
        {...other}
        subjectId={subjectId}
        pupil={pupil}
        levelVariables={{ pupilId: pupil.id, subjectId: subjectId }}
      />
    );
  }

  WithPupilData.propTypes = {
    pupilVariables: PropTypes.object,
    subjectId: PropTypes.string,
  };

  return WithPupilData;
}
