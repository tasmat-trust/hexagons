import { withStyles } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import theme from '../styles/theme'

export const HexagonsTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: theme.palette.primary.light,
  },
})(Tabs);

export const HexagonsTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.primary.dark,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
