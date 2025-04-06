import PropTypes from 'prop-types';
import { useEffect } from 'react';
import WithLevel from '../data-fetching/WithLevel';

function LevelTitle({ initialVisibleLevel, latestTargetCurrentScore, bubbleGotLevel }) {
  useEffect(() => {
    if (initialVisibleLevel) {
      console.log('LEVEL')
      console.log({latestTargetCurrentScore})
      bubbleGotLevel(initialVisibleLevel, latestTargetCurrentScore);
    }
  }, [initialVisibleLevel]);


  return <></>;
}

LevelTitle.propTypes = {
  bubbleGotLevel: PropTypes.func,
  initialVisibleLevel: PropTypes.object,
  latestTargetCurrentScore: PropTypes.object,
};

export default WithLevel(LevelTitle);
