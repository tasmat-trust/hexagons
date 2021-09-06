import PropTypes from 'prop-types';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import WithGroupFromSlug from '../data-fetching/WithGroupFromSlug';
import WithPupilsByGroup from '../data-fetching/WithPupilsByGroup';
import { useRouter } from 'next/router';

import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    float: 'right',
    position: 'relative',
    top: '-1rem'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function PupilPicker({ currentPupil, pupils, subjectSlug, activeGroupSlug, groupName, gotNonResponse }) {
  const classes = useStyles();
  const [pupilId, setPupilId] = useState(currentPupil.id);
  const router = useRouter();
  if (gotNonResponse) return <div className={classes.formControl}>{gotNonResponse}</div>
  const handleChange = (event) => {
    alert('now')
    const pupilId = event.target.value;
    const isSubjectsListing = router.asPath.includes('subjects');
    const isRainbowAwards = router.asPath.includes('rainbow-awards')
    if (isSubjectsListing || isRainbowAwards) {
      const basePath = isSubjectsListing ? 'subjects' : 'rainbow-awards'
      router.push(`/${basePath}/${subjectSlug}/${activeGroupSlug}/${pupilId}`, undefined, {
        shallow: true,
      });
    } else {
      router.push(`/pupils/${activeGroupSlug}/${pupilId}/${subjectSlug}`, undefined, {
        shallow: true,
      });
    }
    setPupilId(pupilId);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-native-helper">Select from {groupName}</InputLabel>
      <NativeSelect value={pupilId} onChange={handleChange}>
        <option aria-label="None" value="" />
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
  currentPupil: PropTypes.object,
  pupils: PropTypes.array,
  subjectSlug: PropTypes.string,
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
};

export default WithGroupFromSlug(WithPupilsByGroup(PupilPicker));
