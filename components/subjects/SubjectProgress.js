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

  return (
    <ErrorBoundary alert="Error in SubjectProgress component">
      {level && (
        <>
          <Typography component="h3" variant="h6" className={classes.flexy}>
            {linkUrl && (
              <Link href={linkUrl}>
                <a>{titleName}</a>
              </Link>
            )}
            {!linkUrl && <>{titleName}</>}
            <Chip color="secondary" size="small" label={label} />

            <span className={classes.span}>{level.percentComplete}%</span>
          </Typography>

          <StyledSlider
            className={classes.slider}
            disabled={true}
            value={level.percentComplete}
            min={0}
            max={100}
          />
        </>
      )}
      {!level && (
        <>
          <Typography component="h3" variant="h6">
            {linkUrl && (
              <Link href={linkUrl}>
                <a>{titleName}</a>
              </Link>
            )}
            {!linkUrl && <>{titleName}</>}
            <span className={classes.span}>0%</span>
          </Typography>

          <StyledSlider className={classes.slider} disabled={true} value={0} min={0} max={100} />
        </>
      )}
    </ErrorBoundary>
  );
}

SubjectProgressDefault.propTypes = {
  isRainbowAwards: PropTypes.bool,
  linkUrl: PropTypes.string,
  isPupilCard: PropTypes.bool,
  titleName: PropTypes.string,
  getLevelVariables: PropTypes.object,
};

export const SubjectProgressWithLinks = SubjectProgressLinks(SubjectProgressDefault);
export const SubjectProgress = SubjectProgressDefault;
