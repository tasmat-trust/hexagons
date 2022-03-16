import PropTypes from 'prop-types';
import { Typography, Box, Button, Fade } from '@mui/material';
import createLevel from '../forms/handlers/createLevel';
import updateLevel from '../forms/handlers/updateLevel';
import { useEffect, useState, useCallback, useContext } from 'react';
import Popover from '@mui/material/Popover';
import LinearProgress from '@mui/material/LinearProgress';
import makeStyles from '@mui/styles/makeStyles';
import { getPercentComplete, getPercentFromStatus } from '../../utils/getPercentComplete';

import LevelStatusTitle from './LevelStatusTitle';
import DialogButton from '../ui-globals/DialogButton';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import CustomSuspense from '../data-fetching/CustomSuspense';

import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
  level: {
    marginTop: 0,
    marginBottom: theme.spacing(2),
  },
  info: {
    border: 'solid 1px',
    padding: '0px 6px 2px',
    borderRadius: '5px',
  },
  complete: {
    background: theme.palette.success.light,
    borderColor: theme.palette.success.dark,
  },
  incomplete: {
    background: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.main,
  },
  notstarted: {
    background: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.main,
  },
  header: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
  },
  emDash: {
    '@media (max-width: 900px)': {},
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: theme.typography.secondaryFamily,
    lineHeight: '1.5',
    fontSize: 'clamp(1.5rem, 3vw, 3rem)',
    marginBottom: theme.spacing(1),
  },
  guidanceBox: {
    '@media (max-width: 900px)': {},
  },
  actionsBox: {
    '@media (max-width: 900px)': {},
  },
  endButton: {
    marginLeft: theme.spacing(1),
    '@media (max-width: 600px)': {},
  },
  icon: {
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
}));

function calculateCompetenciesForThisLevel(allComps, capabilitiesToMatch) {
  if (allComps) {
    const capString = JSON.stringify(capabilitiesToMatch);
    const competencies = allComps.filter((comp, i) => capString.includes(comp.capability_fk));
    return competencies;
  }
  return null;
}

function LevelStatus({
  currentModule,
  subjectId,
  edSubjectId,
  pupil,
  competencies,
  levelId,
  levelWasQuickAssessed,
  levelTitle,
  setLevelId,
  ...other
}) {
  const { gqlClient } = useContext(HexagonsContext);

  const classes = useStyles();
  const [visiblePercentComplete, setVisiblePercentComplete] = useState(0);
  const [actualPercentComplete, setActualPercentComplete] = useState(0);
  const [isQuickAssessing, setIsQuickAssessing] = useState(false);
  const [hasBeenQuickAssessed, setHasBeenQuickAssessed] = useState(levelWasQuickAssessed);

  const [status, setStatus] = useState('notstarted');
  const [readyToShow, setReadyToShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [thisLevelCompetencies, setThisLevelCompetencies] = useState(null);

  useEffect(() => {
    setHasBeenQuickAssessed(levelWasQuickAssessed);
  }, [levelWasQuickAssessed]);

  useEffect(() => {
    const thisLevelComps = calculateCompetenciesForThisLevel(
      competencies,
      currentModule.capabilities
    );
    setThisLevelCompetencies(thisLevelComps);
  }, [competencies]);

  useEffect(() => {
    if (levelId === 0) {
      setStatus('notstarted');
    }
  }, [levelId, pupil]);

  useEffect(() => {
    setVisiblePercentComplete(0);
    setActualPercentComplete(0);
  }, [pupil]);

  const bubbleGotLevel = useCallback(
    (level) => {
      if (level) {
        setLevelId(parseInt(level.id));
      }
      setStatus(level && level.status ? level.status : 'notstarted');
    },
    [setLevelId, setStatus, levelId]
  );

  useEffect(() => {
    setReadyToShow(true);
    let percentComplete;
    if (hasBeenQuickAssessed) {
      percentComplete = getPercentFromStatus(status);
    } else {
      percentComplete = getPercentComplete(thisLevelCompetencies, currentModule.capabilities);
    }

    if (!isQuickAssessing) {
      const percentCompleteWithShortcuts = status === 'complete' ? 100 : percentComplete;
      setVisiblePercentComplete(percentCompleteWithShortcuts);
      setActualPercentComplete(percentComplete);
    }

    if (percentComplete === 100) {
      completeStep();
    }
  }, [thisLevelCompetencies, currentModule, completeStep, status]);

  const triggerCreateLevel = useCallback(
    async ({ status, wasQuickAssessed }) => {
      if (status && subjectId && pupil && pupil.id && currentModule && currentModule.id) {
        const variables = {
          status: status,
          wasQuickAssessed: wasQuickAssessed,
          subjectId: currentModule.isEd ? edSubjectId : subjectId,
          pupilId: parseInt(pupil.id),
          moduleId: parseInt(currentModule.id),
        };
        const level = await createLevel(gqlClient, variables);
        setHasBeenQuickAssessed(level.wasQuickAssessed);
        bubbleGotLevel(level);
      } else {
        console.log(status, subjectId, pupil, currentModule);
        throw new Error('Something has gone wrong. Please refresh and try again.');
      }
    },
    [bubbleGotLevel, pupil, currentModule, gqlClient, subjectId, edSubjectId]
  );

  const triggerUpdateLevel = useCallback(
    async ({ status, wasQuickAssessed }) => {
      const variables = {
        status: status,
        subjectId: subjectId,
        levelId: levelId,
        wasQuickAssessed: wasQuickAssessed,
      };
      const level = await updateLevel(gqlClient, variables);
      setHasBeenQuickAssessed(level.wasQuickAssessed);
      bubbleGotLevel(level);
    },
    [bubbleGotLevel, gqlClient, levelId, subjectId]
  );

  function completeStepHandler(e) {
    e.preventDefault();
    completeStep();
  }

  function markActiveHandler(e, manualStatus) {
    e.preventDefault();
    markActive(manualStatus);
  }

  const completeStep = useCallback(() => {
    setIsQuickAssessing(false);
    if (status && status !== 'complete') {
      const args = {
        status: 'complete',
        wasQuickAssessed: false,
      };

      if (levelId) {
        console.log('updating from here 1');
        triggerUpdateLevel(args);
      } else {
        //create level and mark as complete
        triggerCreateLevel(args);
      }

      setHasBeenQuickAssessed(false);
    }
  }, [status, levelId, triggerUpdateLevel, triggerCreateLevel]);

  async function markActive(manualStatus) {
    setIsQuickAssessing(true);

    if (actualPercentComplete === 100) {
      setAlertMessage(
        `Please remove some individual competencies and then mark this ${currentModule.level} as ${manualStatus}.`
      );
      return;
    }

    if (actualPercentComplete > 75 && ['emerging', 'developing'].includes(manualStatus)) {
      setAlertMessage(
        `Please remove some individual competencies reducing the percentage below 75 and then mark this ${currentModule.level} as ${manualStatus}.`
      );
      return;
    }

    if (actualPercentComplete > 50 && manualStatus === 'developing') {
      setAlertMessage(
        `Please remove some individual competencies reducing the percentage below 50 and then mark this ${currentModule.level} as ${manualStatus}.`
      );
      return;
    }

    if (actualPercentComplete > 25 && manualStatus === 'emerging') {
      setAlertMessage(
        `Please remove some individual competencies reducing the percentage below 25 and then mark this ${currentModule.level} as ${manualStatus}.`
      );
      return;
    }

    const visiblePercent = getPercentFromStatus(manualStatus);
    setVisiblePercentComplete(visiblePercent);
    const args = {
      status: manualStatus,
      wasQuickAssessed: true,
    };
    if (levelId) {
      // Mark current level as manual status
      triggerUpdateLevel(args);
    } else {
      // create level and mark as manual status
      triggerCreateLevel(args);
    }
    setHasBeenQuickAssessed(true);
  }

  // Popover
  const statuses = ['emerging', 'developing', 'secure'];
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen ? 'simple-popover' : undefined;
  function quickAssessHandler(event) {
    setPopoverAnchorEl(event.currentTarget);
    setIsQuickAssessing(true);
  }
  function handleQuickAssessClose() {
    setIsQuickAssessing(false);
    setPopoverAnchorEl(null);
  }

  useEffect(() => {
    if (!isQuickAssessing && !hasBeenQuickAssessed) {
      let args = {
        wasQuickAssessed: false,
      };
      if (actualPercentComplete > 75) {
        return;
      }

      if (actualPercentComplete > 50) {
        if (status !== 'secure') {
          args.status = 'secure';
          triggerUpdateLevel(args);
          return;
        }
        return;
      }

      if (actualPercentComplete > 25) {
        if (status !== 'developing') {
          args.status = 'developing';
          triggerUpdateLevel(args);
          return;
        }
        return;
      }

      if (actualPercentComplete > 0) {
        if (status !== 'emerging') {
          args.status = 'emerging';
          triggerUpdateLevel(args);
          return;
        }
        return;
      }
    }
  }, [actualPercentComplete]);

  const displayValue = Math.round(visiblePercentComplete);
  return (
    <Fade in={readyToShow}>
      <Box className={classes.level} role="region" aria-live="polite">
        {alertMessage && (
          <Alert
            data-test-id="level-status-alert"
            onClose={() => {
              setAlertMessage(false);
            }}
          >
            {alertMessage}
          </Alert>
        )}
        <Box className={classes.titleBox}>
          <CustomSuspense message="Loading level" textOnly={true}>
            <ErrorBoundary alert="Failed to load levels">
              <LevelStatusTitle
                levelTitle={levelTitle}
                bubbleGotLevel={bubbleGotLevel}
                classes={classes}
                status={status}
                {...other}
              />
            </ErrorBoundary>
          </CustomSuspense>

          <Typography
            className={classes.title}
            data-test-id="percent-complete-label"
            variant="h2"
            color="textPrimary"
          >{`${displayValue}%`}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box width="100%">
            <LinearProgress color="secondary" variant="determinate" value={displayValue} />
          </Box>
        </Box>
        <Box className={classes.header}>
          <Box className={classes.guidanceBox}></Box>

          <Box className={classes.actionsBox}>
            <DialogButton
              modelname="summary"
              title={`View ${levelTitle} summary`}
              label="Summary"
              testId="view-summary-button"
              color="primary"
              variant="contained"
              boxTitle={`${levelTitle} summary`}
            >
              <div style={{ whiteSpace: 'pre' }}>{currentModule.summary}</div>
            </DialogButton>

            <Button
              aria-describedby={popoverId}
              title={`Quick assess ${levelTitle}`}
              data-test-id="quick-assess"
              className={classes.endButton}
              variant="contained"
              color="secondary"
              onClick={quickAssessHandler}
            >
              Quick assess
            </Button>
            <Popover
              PaperProps={{ sx: { padding: '1rem' } }}
              id={popoverId}
              open={popoverOpen}
              anchorEl={popoverAnchorEl}
              onClose={handleQuickAssessClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              {statuses.map((manualStatus, i) => (
                <Button
                  key={`status-button-${i}`}
                  title={`Mark ${levelTitle} ${manualStatus}`}
                  data-test-id={`mark-${manualStatus}`}
                  className={classes.endButton}
                  variant="contained"
                  color="secondary"
                  onClick={(e) => markActiveHandler(e, manualStatus)}
                >
                  {manualStatus}
                </Button>
              ))}

              <Button
                title={`Mark ${levelTitle} complete`}
                data-test-id="mark-complete"
                className={classes.endButton}
                variant="contained"
                color="secondary"
                onClick={completeStepHandler}
              >
                Complete
              </Button>
            </Popover>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}

LevelStatus.propTypes = {
  currentModule: PropTypes.object,
  subjectId: PropTypes.number,
  pupil: PropTypes.object,
  competencies: PropTypes.array,
  levelId: PropTypes.number,
  levelWasQuickAssessed: PropTypes.bool,
  levelTitle: PropTypes.string,
  setLevelId: PropTypes.func,
};

export default LevelStatus;
