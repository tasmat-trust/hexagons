import PropTypes from 'prop-types'
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SubjectTiles from '../subjects/SubjectTiles';
import { useRouter } from 'next/router';
import WithAllSubjects from '../data-fetching/WithAllSubjects';

const styles = makeStyles((theme) => ({
  box: {
    marginTop: '-8px'
  }
}))

function Subjects({ linkTo, ...other }) {
  const classes = styles()
  const router = useRouter();
  const onwardHref = linkTo ? linkTo : router.asPath;
  return (
    <Box className={classes.box} data-test-id="subject-tiles-container">
      <SubjectTiles {...other} onwardHref={onwardHref} />
    </Box>
  );
}


Subjects.propTypes = {
  linkTo: PropTypes.string,
}

export default WithAllSubjects(Subjects);
