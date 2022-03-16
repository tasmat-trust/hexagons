import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import {  useEffect } from 'react';
import WithLevel from '../data-fetching/WithLevel';

function LevelTitle({ status, classes, initialVisibleLevel, bubbleGotLevel }) {
  useEffect(() => {
    if (initialVisibleLevel) {
      bubbleGotLevel(initialVisibleLevel);
    }
  }, [initialVisibleLevel, bubbleGotLevel]);
  const statusClass = status !== 'complete' ? 'incomplete' : 'complete'
  return (
    <Typography data-test-id="level-status-title" className={classes.title} variant="h2">
      {(status !== 'notstarted') && (
        <span>
          <span data-test-id="level-status-status" className={`${classes.info} ${classes[statusClass]}`}>
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
