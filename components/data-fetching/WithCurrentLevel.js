import PropTypes from 'prop-types';
import useStateOnce from './useStateOnce';
import { getLevels } from '../../queries/Pupils';
import handleNonResponses from './handleNonResponses';
import getCurrentLevel from '../../utils/getCurrentLevel';

export default function WithCurrentLevel(WrappedComponent) {
  function WithCurrentLevel({ levelVariables, ...other }) {
    const [levelsData, error] = useStateOnce([getLevels, levelVariables]);
    const gotNonResponse = handleNonResponses(levelsData, error, 'No levels found');
    let startingLevel = null;
    if (!gotNonResponse) {
      startingLevel = getCurrentLevel(levelsData.levels)
    }
  
    return (
      <>
        {startingLevel && <WrappedComponent  {...other} startingLevel={startingLevel} />}
        {!startingLevel && <WrappedComponent {...other} />}
      </>
    );
  }

  WithCurrentLevel.propTypes = {
    levelVariables: PropTypes.object,
  };

  return WithCurrentLevel;
}
