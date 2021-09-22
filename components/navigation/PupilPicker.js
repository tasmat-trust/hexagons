import PropTypes from 'prop-types';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import WithPupilsByGroup from '../data-fetching/WithPupilsByGroup';
import { useRouter } from 'next/router';

import { useState } from 'react';

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

function PupilPicker({ currentPupilId, pupils, subjectSlug, activeGroupSlug, groupName }) {
  const classes = useStyles();
  const [pupilId, setPupilId] = useState(currentPupilId);
  const router = useRouter();
  const handleChange = (event) => {
    const newPupilId = event.target.value;
    const isSubjectsListing = router.asPath.includes('subjects');
    const isRainbowAwards = router.asPath.includes('rainbow-awards')
    if (isSubjectsListing || isRainbowAwards) {
      const basePath = isSubjectsListing ? 'subjects' : 'rainbow-awards'
      router.push(`/${basePath}/${subjectSlug}/${activeGroupSlug}/${newPupilId}`, undefined, {
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
      <InputLabel htmlFor="age-native-helper" className={classes.label}>Select from {groupName}</InputLabel>
      <NativeSelect value={pupilId} onChange={handleChange}> 
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
};

export default WithPupilsByGroup(PupilPicker);
