import PropTypes from 'prop-types';
import useSWR from 'swr';
import { getLevelsForOverview } from '../../queries/Pupils';
import { Typography } from '@mui/material';
import Link from 'next/link';
import makeStyles from '@mui/styles/makeStyles';
import '@reach/slider/styles.css';
import styled from 'styled-components';
import { Slider } from '@reach/slider';
import { purple } from '@mui/material/colors';
import getCurrentLevel from '../../utils/getCurrentLevel';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import getRainbowLabel from '../../utils/getRainbowLabel';
import getNormalisedModuleNumber from '../../utils/getNormalisedModuleNumber';
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

function SubjectProgressDefault(props) {
  console.log(props);
  const {
    titleName,
    linkUrl,
    isPupilCard,
    getLevelVariables,
    isRainbowAwards,
    isRaLink,
    isConstrained,
  } = props;
  const classes = useStyles();
  const { data: levelData } = useSWR([getLevelsForOverview, getLevelVariables]);
  let level = null;
  if (levelData) {
    level = getCurrentLevel(levelData.levels);
  }

  let label = '';
  let normalisedLabel = '';
  let levelNumber = 1;

  if (level) {
    levelNumber = getNormalisedModuleNumber(level);
    normalisedLabel = `S${levelNumber}`;
    if (isRainbowAwards && !isPupilCard) {
      label = getRainbowLabel(parseInt(level.module.order) - 1);
    } else {
      label = `${level.module.level === 'stage' ? 'Stage' : 'Step'} ${level.module.order}`;
    }
  }

  const labels = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12'];
  const completedLevelIndex = labels.indexOf(normalisedLabel);
  const steps = labels.map((label) => ({ name: label }));

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

  function RightEdgeLabel() {
    return (
      <span className={classes.span}>
        {label} - {level.percentComplete}%
      </span>
    );
  }

  return (
    <ErrorBoundary alert="Error in SubjectProgress component">
      {level && (
        <>
          <Typography component="h3" variant="h6" className={classes.flexy}>
            {linkUrl && !isRaLink && (
              <Link href={linkUrl}>
                <a>{titleName}</a>
              </Link>
            )}
            {!linkUrl && isRaLink && (
              <Link
                href={`/rainbow-awards/${props.titleSlug}/${props.activeGroupSlug}/${props.pupilId}`}
              >
                <a>{titleName}</a>
              </Link>
            )}
            {!linkUrl && !isRaLink && <>{titleName}</>}
            <RightEdgeLabel />
          </Typography>

          <StyledSlider
            className={classes.slider}
            disabled={true}
            value={totalPercentComplete}
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

          <StyledSlider className={classes.slider} disabled={true} value={1} min={0} max={100} />
        </>
      )}
    </ErrorBoundary>
  );
}

SubjectProgressDefault.propTypes = {
  isConstrained: PropTypes.bool,
  isRainbowAwards: PropTypes.bool,
  isRaLink: PropTypes.bool,
  linkUrl: PropTypes.string,
  isPupilCard: PropTypes.bool,
  titleName: PropTypes.string,
  getLevelVariables: PropTypes.object,
};

export const SubjectProgressWithLinks = SubjectProgressLinks(SubjectProgressDefault);
export const SubjectProgress = SubjectProgressDefault;
