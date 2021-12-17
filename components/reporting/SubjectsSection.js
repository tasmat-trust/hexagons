import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import WithAllSubjects from '../data-fetching/WithAllSubjects';
import { SubjectProgress } from '../subjects/SubjectProgress';
import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  subjectUl: {
    margin: 0,
    padding: 0,
    columns: 'auto 2',
    columnGap: theme.spacing(4),
  },
  subjectLi: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
}));

function SubjectsSection({ allSubjects, subjects, pupil, className, ...other }) {
  const classes = styles();
  return (
    <ul className={classes.subjectUl} data-test-id="subjects">
      {subjects.map((subject, i) => (
        <li className={classes.subjectLi} key={`core-subject-${i}`}>
          {subject.slug && (
            <SubjectProgress
              key={`subject-status-${i}`}
              titleName={<Typography variant="h4">{subject.name}</Typography>}
              getLevelVariables={{ subjectId: subject.id, pupilId: pupil.id }}
              {...other}
            />
          )}
          {!subject.slug && <Typography variant="h4">{subject.name}</Typography>}
          {!subject.slug &&
            subject.subjects.map((s, j) => (
              <SubjectProgress
                key={`subject-status-${j}`}
                titleName={s.name}
                getLevelVariables={{ subjectId: s.id, pupilId: pupil.id }}
                {...other}
              />
            ))}
        </li>
      ))}
    </ul>
  );
}

SubjectsSection.propTypes = {
  allSubjects: PropTypes.array,
};

export default WithAllSubjects(SubjectsSection);
