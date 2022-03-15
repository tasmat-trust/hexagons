import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import WithLevel from '../data-fetching/WithLevel';

function LevelTitle({ status, classes, initialVisibleLevel, bubbleGotLevel, levelTitle }) {
  useEffect(() => {
    if (initialVisibleLevel) {
      bubbleGotLevel(initialVisibleLevel);
    }
  }, [initialVisibleLevel, bubbleGotLevel]);
  return (
    <Typography data-test-id="level-status-title" className={classes.title} variant="h2">
      {(status === 'complete' || status === 'incomplete' || status === 'developing' || status === 'secure') && (
        <span>
          <span data-test-id="level-status-status" className={`${classes.info} ${classes[status]}`}>
            {status === 'incomplete' ? 'emerging' : status }
          </span>
        </span>
      )}
    </Typography>
  );
}

LevelTitle.propTypes = {
  bubbleGotLevel: PropTypes.func,
  initialVisibleLevel: PropTypes.object,
  levelTitle: PropTypes.string,
  status: PropTypes.string,
  checkedStatus: PropTypes.bool,
  classes: PropTypes.object,
};

export default WithLevel(LevelTitle);
