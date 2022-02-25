import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import SubjectsSection from './SubjectsSection';
import { makeStyles } from '@mui/styles';
import { Paper, Grid } from '@mui/material';
import GroupChips from '../groups/GroupChips';
import getTodayDate from '../../utils/getTodayDate';
import useAdminPage from '../../styles/useAdminPage';

const styles = makeStyles((theme) => ({
  date: {
    textAlign: 'left',
  },
  pupilName: {
    textAlign: 'left',
    marginTop: 0,
  },
  sectionName: {
    display: 'block',
    textAlign: 'left',
  },
  subjectsGrid: {},
}));

function PupilOverview({ pupil, ...other }) {
  const classes = styles();
  const css = useAdminPage()
  const todayDate = getTodayDate();

  return (
    <>
      <Paper className={css.paper}>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Typography
              sx={{ fontSize: 14 }}
              data-test-id="report-date"
              color="text.secondary"
              gutterBottom
            >
              {todayDate}
            </Typography>
            <Typography
              data-test-id="pupil-name"
              component="h2"
              variant="h4"
              className={classes.pupilName}
            >
              {pupil.name}
            </Typography>
            <GroupChips shouldLink={false} groups={pupil.groups} pupilId={parseInt(pupil.id)} />
          </Grid>
          <Grid item md={9} className={classes.subjectsGrid}>
            <SubjectsSection testId='attainment' pupil={pupil} {...other} />
            <br/>
            <SubjectsSection testId='pd-attainment' pupil={pupil} isRainbowAwards={true} {...other} />
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
