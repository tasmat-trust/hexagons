import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';
import WithAllSubjects from '../data-fetching/WithAllSubjects';
import { SubjectProgress } from '../subjects/SubjectProgress';

function SubjectsSection({ allSubjects, subjects, pupil, ...other }) {
  return (
    <Paper>
      <Typography variant="h3">All Subjects</Typography>
      <ul data-test-id="core-subjects">
        {allSubjects.map((subject, i) => (
          <SubjectProgress
            key={`subject-status-${i}`}
            titleName={subject.name}
            getLevelVariables={{ subjectId: subject.id, pupilId: pupil.id }}
            {...other}
          />
        ))}
      </ul>
      <Typography variant="h3">Subjects</Typography>
      <ul data-test-id="subjects">
        {subjects.map((subject, i) => (
          <li key={`core-subject-${i}`}>{subject.name}</li>
        ))}
      </ul>
    </Paper>
  );
}

SubjectsSection.propTypes = {
  allSubjects: PropTypes.array,
};

export default WithAllSubjects(SubjectsSection);
