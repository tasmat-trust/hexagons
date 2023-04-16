import PropTypes from 'prop-types';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import WithPupilsByGroup from '../data-fetching/WithPupilsByGroup';
import { useRouter } from 'next/router';
import useStyles from '../../styles/usePickerStyles';
import { useState } from 'react';

function PupilPicker({ currentPupilId, pupils, subjectSlug, activeGroupSlug, isPupilReport }) {
  const classes = useStyles();
  const [pupilId, setPupilId] = useState(currentPupilId);
  const router = useRouter();
  const handleChange = (event) => {
    const newPupilId = parseInt(event.target.value);
    const isSubjectsListing = router.asPath.includes('subjects');
    const isRainbowAwards = router.asPath.includes('rainbow-awards');
    const isEarlyDevelopment = router.asPath.includes('early-development')
    const isFunctionalSkills = router.asPath.includes('functional-skills')
    if (isSubjectsListing || isRainbowAwards || isEarlyDevelopment) {
      const basePath = isFunctionalSkills ? 'functional-skills' : isEarlyDevelopment ? 'early-development' : isRainbowAwards ? 'rainbow-awards' : 'subjects'
      router.push(`/${basePath}/${subjectSlug}/${activeGroupSlug}/${newPupilId}`, undefined, {
        shallow: false,
      });
    } else if (isPupilReport) {
      router.push(`/reports/pupil-overview/${activeGroupSlug}/${newPupilId}`, undefined, {
        shallow: false,
      });
    } else {
      router.push(`/pupils/${activeGroupSlug}/${newPupilId}/${subjectSlug}`, undefined, {
        shallow: false,
      });
    }
    setPupilId(newPupilId);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="pupil-picker" className={classes.label} variant="standard">
        Select pupil
      </InputLabel>
      <NativeSelect
        className={classes.title}
        id="pupil-picker"
        data-test-id="select-pupil"
        value={pupilId}
        onChange={handleChange}
      >
        {pupils.map((pupil, i) => (
          <option key={`pupil-${i}`} value={pupil.id}>
            {pupil.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

PupilPicker.propTypes = {
  currentPupil: PropTypes.number,
  pupils: PropTypes.array,
  subjectSlug: PropTypes.string,
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
  isPupilReport: PropTypes.bool,
};

export default WithPupilsByGroup(PupilPicker);
