import { InputLabel, Select, Input, Typography, TextField, Button } from "@material-ui/core"
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { useState } from "react";

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: { 
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function getStyles(name, selectValue, theme) {
  return {
    fontWeight:
      selectValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const selectItems = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export default function AddNew(props) {


  const classes = useStyles();
  const theme = useTheme();

  const [selectValue, setSelectValue] = useState([]);

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  function handleForm(event) {
    event.preventDefault()
    console.log('handling!')
    console.log(event.target['select-multiple-chip'].value)
  }

  return (
    <>
      <Typography variant="h4">Create new pupil</Typography>

      <form onSubmit={handleForm}>
        <FormControl fullWidth margin="normal">
          <TextField id="name" label="Name" />
        </FormControl>

        <FormControl
          fullWidth
          margin="normal"
          className={classes.formControl}
        >
          <InputLabel id="demo-mutiple-chip-label">Groups</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            fullWidth
            value={selectValue}
            className={classes.selectEmpty}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {selectItems.map((item) => (
              <MenuItem key={item} value={item} style={getStyles(item, selectValue, theme)}>
                {item}
              </MenuItem>
            ))}
          </Select>



        </FormControl>
        <FormControl margin="normal">
  
        <Button fullWidth type="submit" variant="contained" color="primary">
          Add new pupil
        </Button>
        </FormControl>
      </form>
    </>
  )
}