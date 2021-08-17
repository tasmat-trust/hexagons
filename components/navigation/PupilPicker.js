import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import WithGroupFromSlug from '../data-fetching/WithGroupFromSlug';
import WithPupilsByGroup from '../data-fetching/WithPupilsByGroup';
import { useRouter } from 'next/router'

import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    float: 'right'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function PupilPicker(props) {
  const classes = useStyles();
  const { currentPupil, pupils } = props
  const [pupilId, setPupilId] = useState(currentPupil.id)
  const router = useRouter()

  const handleChange = (event) => {
    const pupilId = event.target.value;
    setPupilId(pupilId);
    router.push(`/pupils/${router.query.slug}/${pupilId}/${router.query.subject}`, undefined, { shallow: false })
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-native-helper">Select pupil</InputLabel>
      <NativeSelect
        value={pupilId}
        onChange={handleChange}
      >
        <option aria-label="None" value="" />
        {pupils.map((pupil, i) => (
          <option key={`pupil-${i}`} value={pupil.id}>{pupil.name}</option>
        ))}
      </NativeSelect>
      <FormHelperText>Choose another pupil from {router.query.slug}</FormHelperText>
    </FormControl>
  )
}

export default WithGroupFromSlug(WithPupilsByGroup(PupilPicker))