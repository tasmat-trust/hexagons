import PropTypes from 'prop-types';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useRouter } from 'next/router';
import { useState } from 'react';
import WithAllSubjects from '../data-fetching/WithAllSubjects';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginTop: '-0.95rem'
  },
  label: {
    width: '150px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SubjectPicker({ currentSubjectSlug, allSubjects, activeGroupSlug, currentPupilId }) {
  const classes = useStyles();
  const [subjectSlug, setSubjectSlug] = useState(currentSubjectSlug);
  const router = useRouter();
  const handleChange = (event) => {
    const newSubjectSlug = event.target.value;

    const isSubjectsListing = router.asPath.includes('subjects');
    const isRainbowAwards = router.asPath.includes('rainbow-awards')
    if (isSubjectsListing || isRainbowAwards) {
      const basePath = isSubjectsListing ? 'subjects' : 'rainbow-awards'
      router.push(`/${basePath}/${newSubjectSlug}/${activeGroupSlug}/${currentPupilId}`, undefined, {
        shallow: false,
      });
    } else {
      router.push(`/pupils/${activeGroupSlug}/${currentPupilId}/${newSubjectSlug}`, undefined, {
        shallow: false,
      });
    }
    setSubjectSlug(newSubjectSlug);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-native-helper" className={classes.label}>Select subject</InputLabel>
      <NativeSelect value={subjectSlug} onChange={handleChange}>
        {allSubjects.map((subject, i) => (
          <option key={`subject-${i}`} value={subject.slug}>
            {subject.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

SubjectPicker.propTypes = {
  currentSubjectSlug: PropTypes.string,
  subjects: PropTypes.array,
  activeGroupSlug: PropTypes.string,
  currentPupilId: PropTypes.number
};

export default WithAllSubjects(SubjectPicker);
