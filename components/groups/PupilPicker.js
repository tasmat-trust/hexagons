import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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

function WithPupils(WrappedComponent) {
  return function WithPupils(props) {
    const pupils = [{ id: 1, name: 'Ali' }, { id: 2, name: 'Dave' }]
    return (
      <WrappedComponent pupils={pupils} {...props} />
    )
  }
}

function PupilPicker(props) {
  const classes = useStyles();
  const { currentPupil, pupils } = props
  const [pupilId, setPupilId] = useState(currentPupil.id)


  const handleChange = (event) => {
    const pupilId = event.target.value;
    setPupilId(pupilId);
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

export default WithPupils(PupilPicker)