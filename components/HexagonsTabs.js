import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../styles/theme';

export const HexagonsTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  marginBottom: '1px',
  '& .MuiTabs-indicator': {
    height: '4px',
    display: 'flex',
    justifyContent: 'center',
    background: 'none'
  },
  '& .MuiTabs-indicatorSpan': {
    background: theme.palette.primary.main,
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
    fontFamily: theme.typography.secondaryFamily,
    fontSize: '1.2rem',
    letterSpacing: '0.00735em',
  },
  '&.Mui-focusVisible': {
    color: theme.palette.secondary.main,
  },
}));
