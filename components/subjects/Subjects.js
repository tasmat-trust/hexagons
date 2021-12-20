import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SubjectTiles from '../subjects/SubjectTiles';
import { useRouter } from 'next/router';
import WithAllSubjects from '../data-fetching/WithAllSubjects';

const styles = makeStyles((theme) => ({
  box: {
    marginTop: '-8px',
  },
}));

function Subjects({ hasNoGroupSlugInUrl, activeGroupSlug, ...other }) {
  const classes = styles();
  const router = useRouter();

  let onwardHref = router.asPath === '/' ? '/subjects' : router.asPath;

  if (hasNoGroupSlugInUrl) {
    onwardHref = `${onwardHref}/${activeGroupSlug}`;
  }

  return (
    <Box className={classes.box} data-test-id="subject-tiles-container">
      <SubjectTiles {...other} onwardHref={onwardHref} activeGroupSlug={activeGroupSlug} />
    </Box>
  );
}

Subjects.propTypes = {
  activeGroupSlug: PropTypes.string,
  hasNoGroupSlugInUrl: PropTypes.bool,
};

export default WithAllSubjects(Subjects);
