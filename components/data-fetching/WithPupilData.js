import PropTypes from 'prop-types';
import useStateOnce from './useStateOnce';
import { getPupilById } from '../../queries/Pupils';
import handleNonResponses from './handleNonResponses';

export default function WithPupilData(WrappedComponent) {
  function WithPupilData({ pupilVariables, subjectId, ...other }) {
    const [pupilsData, error] = useStateOnce([getPupilById, pupilVariables]);
    const gotNonResponse = handleNonResponses(pupilsData, error, 'No pupil found');
    if (gotNonResponse) return gotNonResponse;
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
