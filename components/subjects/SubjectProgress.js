import PropTypes from 'prop-types';
import useSWR from 'swr';
import { getLevelsForOverview } from '../../queries/Pupils';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { Chip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import '@reach/slider/styles.css';
import styled from 'styled-components';
import { Slider } from '@reach/slider';
import { purple } from '@mui/material/colors';
import getCurrentLevel from '../../utils/getCurrentLevel';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import getRainbowLabel from '../../utils/getRainbowLabel';

import SubjectProgressLinks from '../link-management/SubjectProgressLinks';

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
    listStyle: 'none',
    padding: 0,
    position: 'relative',
  },
  stepLadder: {
    width: '100%',
    display: 'flex',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  step: {
    textAlign: 'center',
    flex: 1,
  },
  li: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  span: {
    float: 'right',
  },
  slider: {
    marginBottom: theme.spacing(1),
  },
  flexy: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function SubjectProgressDefault({
  titleName,
  linkUrl,
  isPupilCard,
  getLevelVariables,
  isRainbowAwards,
  isConstrained,
}) {
  const classes = useStyles();
  const { data: levelData } = useSWR([getLevelsForOverview, getLevelVariables]);
  let level = null;
  if (levelData) {
    level = getCurrentLevel(levelData.levels);
  }
  let label = '';

  if (level) {
    if (isRainbowAwards && !isPupilCard) {
      label = getRainbowLabel(parseInt(level.module.order) - 1);
    } else {
      label = `${level.module.level === 'stage' ? 'Stage' : 'Step'} ${level.module.order}`;
    }
  }

  const labels = [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4',
    'Step 5',
    'Step 6',
    'Stage 1',
    'Stage 2',
    'Stage 3',
    'Stage 4',
    'Stage 5',
    'Stage 6',
  ];

  const steps = [
    { name: 'Step 1' },
    { name: 'Step 2' },
    { name: 'Step 3' },
    { name: 'Step 4' },
    { name: 'Step 5' },
    { name: 'Step 6' },
    { name: 'Stage 1' },
    { name: 'Stage 2' },
    { name: 'Stage 3' },
    { name: 'Stage 4' },
    { name: 'Stage 5' },
    { name: 'Stage 6' },
  ];

  const completedLevelIndex = labels.indexOf(label);

  const stepsToRender = steps.map((step, i) => {
    if (completedLevelIndex > -1) {
      if (i <= completedLevelIndex) {
        step.completed = true;
      }
      if (i === completedLevelIndex) {
        step.currentLevel = true;
      }
    }
    return step;
  });

  const totalPercentComplete = (100 / steps.length) * (completedLevelIndex + 1);
  const levelTooLowToFloat = completedLevelIndex < 3;

  function StepLadder() {
    return (
      <div className={classes.stepLadder}>
        {level &&
          stepsToRender.map((step, i) => (
            <span key={`step-${i}`} className={`${classes.step} ${classes.active}`}>
              {step.currentLevel && (
                <span>
                  {level.percentComplete}% - {step.name}
                  <StyledSlider
                    className={classes.slider}
                    disabled={true}
                    value={level.percentComplete}
                    min={0}
                    max={100}
                  />
                </span>
              )}
            </span>
          ))}
      </div>
    );
  }

  function RightEdgeLabel() {
    return (
      <span className={classes.span}>
        {label} - {level.percentComplete}%
      </span>
    );
  }

  return (
    <li className={classes.root}>
      <ErrorBoundary alert="Error in SubjectProgress component">
        {level && (
          <>
            {!isConstrained && !levelTooLowToFloat && <StepLadder />}
            <Typography component="h3" variant="h6" className={classes.flexy}>
              {linkUrl && (
                <Link href={linkUrl}>
                  <a>{titleName}</a>
                </Link>
              )}
              {!linkUrl && <>{titleName}</>}

              {isConstrained && <RightEdgeLabel />}
              {!isConstrained && levelTooLowToFloat && <RightEdgeLabel />}
            </Typography>

            <StyledSlider
              className={classes.slider}
              disabled={true}
              value={isConstrained ? level.percentComplete : totalPercentComplete}
              min={0}
              max={100}
            />
          </>
        )}

        {!level && (
          <>
            <Typography component="h3" variant="h6" className={classes.flexy}>
              {linkUrl && (
                <Link href={linkUrl}>
                  <a>{titleName}</a>
                </Link>
              )}
              {!linkUrl && <>{titleName}</>}
            </Typography>

            <StyledSlider className={classes.slider} disabled={true} value={0} min={0} max={100} />
          </>
        )}
      </ErrorBoundary>
    </li>
  );
}

SubjectProgressDefault.propTypes = {
  isConstrained: PropTypes.bool,
  isRainbowAwards: PropTypes.bool,
  linkUrl: PropTypes.string,
  isPupilCard: PropTypes.bool,
  titleName: PropTypes.string,
  getLevelVariables: PropTypes.object,
};

export const SubjectProgressWithLinks = SubjectProgressLinks(SubjectProgressDefault);
export const SubjectProgress = SubjectProgressDefault;
