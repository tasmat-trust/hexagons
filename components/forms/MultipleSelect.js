import { InputLabel, Select, Input } from "@mui/material"
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


// Design
import useFormStyles from '../../styles/useFormStyles';
import { useTheme } from '@mui/material/styles';
import sortByName from "../../utils/sortByName";

export default function MultipleSelect({ selectItems, selectValue, setSelectValue, itemsLabel }) {


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

  const classes = useFormStyles();
  const theme = useTheme();

  const sortedSelectItems = sortByName(selectItems)


  return (
    <FormControl
      fullWidth
      margin="normal"
      className={classes.formControl}
    >
      <InputLabel id="mutiple-chip-label">{itemsLabel}</InputLabel>
      <Select
        data-test-id="multi-select"
        labelId="mutiple-chip-label"
        multiple
        fullWidth
        value={selectValue}
        className={classes.selectEmpty}
        onChange={(event) => setSelectValue(event.target.value)}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => {
              const chosenItem = selectItems.filter(item => item.id === value)
              return (
                <Chip key={`option-${value}`} label={chosenItem[0].name} className={classes.chip} />
              )
            })}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {selectItems.map((item) => (
          <MenuItem key={`option-${item.id}`} value={item.id} style={getStyles(item, selectValue, theme)}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}