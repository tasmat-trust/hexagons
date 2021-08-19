import PropTypes from 'prop-types';
import useStateOnce from './useStateOnce';
import { getLevels } from '../../queries/Pupils';
import handleNonResponses from './handleNonResponses';

export default function WithCurrentLevel(WrappedComponent) {
  function WithCurrentLevel({ levelVariables, ...other }) {
    const [levelsData, error] = useStateOnce([getLevels, levelVariables]);
    const gotNonResponse = handleNonResponses(levelsData, error, 'No levels found');
    let startingLevel = null;
    if (!gotNonResponse) {
      // Get lowest incomplete level
      const incompleteLevels = levelsData.levels.filter((value) => value.status !== 'complete');
      const sortedLevels = incompleteLevels.sort((a, b) => a.module.order > b.module.order);
      startingLevel = sortedLevels[0];
    }
    return (
      <>
        {startingLevel && <WrappedComponent {...other} startingLevel={startingLevel} />}
        {!startingLevel && <WrappedComponent {...other} />}
      </>
    );
  }

  WithCurrentLevel.propTypes = {
    levelVariables: PropTypes.object,
  };

  return WithCurrentLevel;
}
