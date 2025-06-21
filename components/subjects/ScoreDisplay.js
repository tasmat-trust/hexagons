import PropTypes from 'prop-types';
import { Box, Paper, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import '@reach/slider/styles.css';
import styled from 'styled-components';
import { Slider } from '@reach/slider';
import { purple } from '@mui/material/colors';
import Loading from '../ui-globals/Loading';

// Uses styled components to customise Reach Slider component
// https://reach.tech/styling/
const StyledSlider = styled(Slider)`
  [data-reach-slider-range] {
    background: ${purple['A400']};
  }

  [data-reach-slider-handle] {
    display: none;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  scoreBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  scoreValue: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  initialScore: {
    color: theme.palette.grey[600],
  },
  currentScore: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '1.3rem',
  },
  targetScore: {
    color: theme.palette.success.main,
  },
  scoreDate: {
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,
    textAlign: 'right',
    marginTop: theme.spacing(1),
  },
  scoreLabel: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5),
  },
}));

function ScoreDisplay({
  initialScore,
  currentScore,
  targetScore,
  scorePublishedAt,
  isScoreLoading,
  currentSnapshotName,
  isCompact,
}) {
  const classes = useStyles();

  if (isScoreLoading) {
    return <Loading message="Loading score data" />;
  }

  if (!currentScore && !initialScore && !targetScore) {
    return <Typography variant="body1">No score data available</Typography>;
  }

  // Format the date
  const formattedDate = scorePublishedAt
    ? new Date(scorePublishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Unknown date';

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {!isCompact && (
            <Typography className={`${classes.scoreLabel}`} variant="body2">
              Initial
            </Typography>
          )}
          <Typography className={`${classes.scoreValue} ${classes?.initialScore}`}>
            {initialScore ?? 'N/A'}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          {!isCompact && (
            <Typography className={`${classes.scoreLabel}`} variant="body2">
              Current
            </Typography>
          )}
          <Typography className={`${classes.scoreValue} ${classes.currentScore}`}>
            {currentScore ?? 'N/A'}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          {!isCompact && (
            <Typography className={`${classes.scoreLabel}`} variant="body2">
              Target
            </Typography>
          )}
          <Typography className={`${classes.scoreValue} ${classes.targetScore}`}>
            {targetScore ?? 'N/A'}
          </Typography>
        </Grid>
      </Grid>
      <StyledSlider
        className={classes.slider}
        disabled={true}
        value={currentScore ?? 0}
        min={initialScore ?? 0}
        max={targetScore ?? 100}
      />
    </>
  );
}

ScoreDisplay.propTypes = {
  initialScore: PropTypes.number,
  currentScore: PropTypes.number,
  targetScore: PropTypes.number,
  scorePublishedAt: PropTypes.string,
  isScoreLoading: PropTypes.bool,
  currentSnapshotName: PropTypes.string,
  isCompact: PropTypes.bool,
};

export default ScoreDisplay;
