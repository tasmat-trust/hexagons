import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../styles/theme';

export const HexagonsTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  borderBottom: '1px solid #e8e8e8',
  marginBottom: '6px',
  '& .MuiTabs-indicator': {
    height: '4px',
    display: 'flex',
    justifyContent: 'center',
    background: 'none'
  },
  '& .MuiTabs-indicatorSpan': {
    background: theme.palette.secondary.main,
    display: 'block',
    width: '40px',
    height: '4px'
  },
});

export const HexagonsTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 72,
  fontWeight: theme.typography.fontWeightRegular,
  borderRadius: '50px',
  marginRight: theme.spacing(4),
  marginLeft: '0',
  padding: '0',
  '&:hover': {
    color: 'inherit',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: 'inherit',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    color: theme.palette.secondary.main,
  },
}));
