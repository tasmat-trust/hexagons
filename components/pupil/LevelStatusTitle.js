import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import WithLevel from '../data-fetching/WithLevel';

function LevelTitle({ initialVisibleLevel, bubbleGotLevel }) {
  useEffect(() => {
    if (initialVisibleLevel) {
      bubbleGotLevel(initialVisibleLevel);
    }
  }, [initialVisibleLevel]);

  return <></>;
}

LevelTitle.propTypes = {
  bubbleGotLevel: PropTypes.func,
  initialVisibleLevel: PropTypes.object,
};

export default WithLevel(LevelTitle);
