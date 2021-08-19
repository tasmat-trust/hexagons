import { Grid } from '@material-ui/core';
import useAdminPage from '../../styles/useAdminPage';
import Subjects from '../subjects/Subjects';

function PupilSubjectsView(props) {
  const classes = useAdminPage();
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Subjects classes={classes} {...props} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default PupilSubjectsView;
