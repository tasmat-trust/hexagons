import PropTypes from 'prop-types';
import { Box, Paper, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Loading from '../ui-globals/Loading';

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
  }
}));

function ScoreDisplay({ 
  initialScore, 
  currentScore, 
  targetScore,
  scorePublishedAt, 
  isScoreLoading,
  currentSnapshotName 
}) {
  const classes = useStyles();

  if (isScoreLoading) {
    return <Loading message="Loading score data" />;
  }

  if (!currentScore && !initialScore && !targetScore) {
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="body1">No score data available</Typography>
      </Paper>
    );
  }

  // Format the date
  const formattedDate = scorePublishedAt 
    ? new Date(scorePublishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Unknown date';

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h6" gutterBottom>
        Progress {currentSnapshotName ? `(${currentSnapshotName})` : ''}
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography className={classes.scoreLabel} variant="body2">
            Initial
          </Typography>
          <Typography className={`${classes.scoreValue} ${classes.initialScore}`}>
            {initialScore}
          </Typography>
        </Grid>
        
        <Grid item xs={4}>
          <Typography className={classes.scoreLabel} variant="body2">
            Current
          </Typography>
          <Typography className={`${classes.scoreValue} ${classes.currentScore}`}>
            {currentScore}
          </Typography>
        </Grid>
        
        <Grid item xs={4}>
          <Typography className={classes.scoreLabel} variant="body2">
            Target
          </Typography>
          <Typography className={`${classes.scoreValue} ${classes.targetScore}`}>
            {targetScore}
          </Typography>
        </Grid>
      </Grid>
      
      {scorePublishedAt && (
        <Typography className={classes.scoreDate}>
          Last updated: {formattedDate}
        </Typography>
      )}
    </Paper>
  );
}

ScoreDisplay.propTypes = {
  initialScore: PropTypes.number,
  currentScore: PropTypes.number,
  targetScore: PropTypes.number,
  scorePublishedAt: PropTypes.string,
  isScoreLoading: PropTypes.bool,
  currentSnapshotName: PropTypes.string
};

export default ScoreDisplay; 