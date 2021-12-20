import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import SubjectsSection from './SubjectsSection';
import { makeStyles } from '@mui/styles';
import { Paper, Grid } from '@mui/material';
import GroupChips from '../groups/GroupChips';
import getTodayDate from '../../utils/getTodayDate'

const styles = makeStyles((theme) => ({
  heading: {
    textAlign: 'center',
  },
  pupilName: {
    textAlign: 'left',
    marginTop: 0,
  },
  sectionName: {
    display: 'block',
    textAlign: 'center',
  },
  subjectsGrid: {},
}));

function PupilOverview({ pupil, ...other }) {
  const classes = styles();
  const todayDate = getTodayDate()

  return (
    <>
      <Typography className={classes.heading} variant="h1">
        Hexagons Report
      </Typography>
      <Typography data-test-id="report-date" className={classes.heading} variant="h2">
        {todayDate}
      </Typography>
      <Paper sx={{ mt: 3, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Typography data-test-id="pupil-name" variant="h2" className={classes.pupilName}>
              {pupil.name}
            </Typography>
            <GroupChips shouldLink={false} groups={pupil.groups} pupilId={pupil.id} />
          </Grid>
          <Grid item md={9} className={classes.subjectsGrid}>
            <Typography variant="h2" className={classes.sectionName} data-test-id="academic-attainment"> 
              Academic Attainment
            </Typography>
            <SubjectsSection pupil={pupil} {...other} />
            <Typography variant="h2" className={classes.sectionName} data-test-id="pd-attainment">
              Personal Development Attainment
            </Typography>
            <SubjectsSection pupil={pupil} isRainbowAwards={true} {...other} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

PupilOverview.propTypes = {
  pupil: PropTypes.object,
};

export default PupilOverview;
