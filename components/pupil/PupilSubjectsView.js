import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import useAdminPage from '../../styles/useAdminPage';
import Subjects from '../subjects/Subjects';

function PupilSubjectsView({ pupil, ...other }) {
  const classes = useAdminPage();
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography>{pupil.name}</Typography>
            <Subjects classes={classes} {...other} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

PupilSubjectsView.propTypes = {
  pupil: PropTypes.object,
};

export default PupilSubjectsView;
