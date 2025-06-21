import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getLevels } from '../../queries/Pupils';
import getCurrentLevel from '../../utils/getCurrentLevel';
import getLatestTarget from '../../utils/getLatestTarget';

export default function WithCurrentLevel(WrappedComponent) {
  function WithCurrentLevel({ levelVariables, ...other }) {
    const { data: levelsData } = useSWR([getLevels, levelVariables], { suspense: true });
    const [currentScore, setCurrentScore] = useState(null);
    let startingLevel = getCurrentLevel(levelsData.levels);
    let latestTarget = getLatestTarget(levelsData.targets);
    console.log('LATEST TARGET', latestTarget)
    useEffect(() => {
      if (latestTarget) {
        setCurrentScore(latestTarget?.currentScore);
      }
    }, [latestTarget]);
    return <WrappedComponent {...other} startingLevel={startingLevel} latestTarget={latestTarget} currentScore={currentScore} setCurrentScore={setCurrentScore} />;
  }

  WithCurrentLevel.propTypes = {
    levelVariables: PropTypes.object,
  };

  return WithCurrentLevel;
}
