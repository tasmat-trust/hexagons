import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import ErrorBoundary from '../data-fetching/ErrorBoundary';

import { SubjectProgressWithLinks } from '../subjects/SubjectProgress';

const useStyles = makeStyles(() => ({
  root: {
    listStyle: 'none',
    padding: 0,
  },
  li: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
}));

function CoreSubjectsProgress({ pupilId, coreSubjects, schoolType, edLevel, ...other }) {
  const classes = useStyles();
  let subjects = [];
  if (schoolType === 'secondary') {
    subjects = coreSubjects.filter(
      (subject) => !subject.isEarlyDevelopment && subject.slug !== 'primary-science'
    );
  } else {
    if (edLevel.status !== 'complete') {
      subjects = coreSubjects.filter(
        (subject) => subject.isEarlyDevelopment || subject.isExpressiveAndReceptiveLanguage
      );
    } else {
      subjects = coreSubjects.filter(
        (subject) => !subject.isEarlyDevelopment && subject.slug !== 'investigation-skills'
      );
    }
  }

  return (
    <ul className={classes.root}>
      {subjects.map((subject, i) => (
        <ErrorBoundary key={`subject-${i}`} fallback={<p>Error rendering {subject.name}</p>}>
          <li className={classes.li}>
            <SubjectProgressWithLinks
              {...other} // activeGroupSlug
              useSubjectsBaseSlug={true}
              isConstrained={true}
              subjectSlug={subject.slug}
              titleName={subject.name}
              getLevelVariables={{ subjectId: parseInt(subject.id), pupilId: pupilId }}
              pupilId={pupilId}
            />
          </li>
        </ErrorBoundary>
      ))}
    </ul>
  );
}

CoreSubjectsProgress.propTypes = {
  schoolType: PropTypes.string,
  edLevel: PropTypes.object,
  pupilId: PropTypes.number,
  coreSubjects: PropTypes.array,
};

export default CoreSubjectsProgress;
