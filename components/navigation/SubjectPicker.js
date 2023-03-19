import PropTypes from 'prop-types';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WithAllSubjects from '../data-fetching/WithAllSubjects';

import useStyles from '../../styles/usePickerStyles';

function SubjectPicker({
  isOverviewPage,
  currentSubjectSlug,
  subjects,
  activeGroupSlug,
  currentPupilId,
  isRainbowAwards,
  isEarlyDevelopment,
  isGroupOverviewReport,
}) {
  const classes = useStyles();
  const [subjectSlug, setSubjectSlug] = useState(currentSubjectSlug);
  useEffect(() => {
    setSubjectSlug(currentSubjectSlug);
  }, [currentSubjectSlug]);

  const router = useRouter();
  const handleChange = (event) => {
    const newSubjectSlug = event.target.value;
    const isSubjectsListing = router.asPath.includes('subjects');
    let navigateTo;

    const basePath = isEarlyDevelopment ? 'early-development' : isRainbowAwards ? 'rainbow-awards' : 'subjects'
    if ((isSubjectsListing || isRainbowAwards || isEarlyDevelopment) && activeGroupSlug && currentPupilId) {
      navigateTo = `/${basePath}/${newSubjectSlug}/${activeGroupSlug}/${currentPupilId}`;
    } else if ((isSubjectsListing || isRainbowAwards || isEarlyDevelopment) && activeGroupSlug) {
      navigateTo = `/${basePath}/${newSubjectSlug}/${activeGroupSlug}`;
    } else if (isOverviewPage) {
      navigateTo = `/${basePath}/${newSubjectSlug}/`;
    } else if (isGroupOverviewReport) {
      navigateTo = `/reports/group-overview/${activeGroupSlug}/${newSubjectSlug}`;
    } else {
      navigateTo = `/pupils/${activeGroupSlug}/${currentPupilId}/${newSubjectSlug}`;
    }
    router.push(navigateTo, undefined, {
      shallow: true,
    });
  };

  const subjectsWithSlug = subjects.filter((subject) => subject.slug);
  const subjectsWithoutSlug = subjects.filter((subject) => !subject.slug);

 
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="subject-picker" className={classes.label} variant="standard">
        Select {isRainbowAwards ? 'award' : 'subject'}
      </InputLabel>
      <NativeSelect
        className={classes.title}
        id="subject-picker"
        data-test-id="select-subject"
        value={subjectSlug}
        onChange={handleChange}
      >
        <optgroup label="Subjects">
          {subjectsWithSlug.map((subject, i) => (
            <option key={`subject-${i}`} value={subject.slug}>
              {subject.name}
            </option>
          ))}
        </optgroup>
        {subjectsWithoutSlug.map((subject, i) => (
          <optgroup key={`optgroup-${i}`} label={subject.name}>
            {subject.subjects.map((childSubject, j) => {
              return (
                <option key={`child-subject-${j}`} value={childSubject.slug}>
                  {childSubject.name}
                </option>
              );
            })}
          </optgroup>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

SubjectPicker.propTypes = {
  currentSubjectSlug: PropTypes.string,
  subjects: PropTypes.array,
  activeGroupSlug: PropTypes.string,
  isOverviewPage: PropTypes.bool,
  isGroupOverviewReport: PropTypes.bool,
  currentPupilId: PropTypes.number,
};

export default WithAllSubjects(SubjectPicker);
