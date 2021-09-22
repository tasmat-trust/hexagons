import PropTypes from 'prop-types'
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import SubjectTiles from '../subjects/SubjectTiles';
import { useRouter } from 'next/router';
import WithAllSubjects from '../data-fetching/WithAllSubjects';

const styles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(2)
  }
}))

function Subjects({ linkTo, ...other }) {
  const classes = styles()
  const router = useRouter();
  const onwardHref = linkTo ? linkTo : router.asPath;
  return (
    <Box className={classes.box}>
      <SubjectTiles {...other} onwardHref={onwardHref} />
    </Box>
  );
}


Subjects.propTypes = {
  linkTo: PropTypes.string,
}

export default WithAllSubjects(Subjects);
