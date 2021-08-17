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
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function PupilPicker(props) {
  const classes = useStyles();
  const { currentPupil, pupils, groupSlug } = props
  const [pupilId, setPupilId] = useState(currentPupil.id)
  const router = useRouter()
   
  const handleChange = (event) => {
    const pupilId = event.target.value;
    setPupilId(pupilId);
    router.push(`/pupils/${router.query.slug}/${pupilId}/number`, undefined, {shallow: true})
  };

  return (
    <>
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
        <FormHelperText>Choose another pupil from {props.groupSlug}</FormHelperText>
      </FormControl>
      {pupilId}
    </>
  )
}

export default WithGroupFromSlug(WithPupilsByGroup(PupilPicker))