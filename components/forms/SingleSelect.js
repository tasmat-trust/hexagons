import { InputLabel, Select, Input } from "@material-ui/core"
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { allSubjects } from '../../queries/Subjects'

// Design
import useFormStyles from '../../styles/useFormStyles';
import { useTheme } from '@material-ui/core/styles';

import useSWR from "swr";

function SingleSelectWithSubjects(WrappedComponent) {
  return function SingleSelectWithSubjects(props) {
    const { data: subjectsData, mutate: setSubjectsData } = useSWR(allSubjects, { suspense: true })
    return (
      <WrappedComponent {...props} selectItems={subjectsData.subjects} />
    )
  }
}



function SingleSelect({ selectItems, selectValue, setSelectValue, itemLabel }) {


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


  return (
    <FormControl
      fullWidth
      margin="normal"
      className={classes.formControl}
    >
      <InputLabel id="demo-mutiple-chip-label">{itemLabel}</InputLabel>
      <Select
        data-test-id="multi-select"
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
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

const SingleSelectWithAllSubjects = SingleSelectWithSubjects(SingleSelect)

export {
  SingleSelect,
  SingleSelectWithAllSubjects
}