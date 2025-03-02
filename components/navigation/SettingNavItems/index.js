import { Typography, Box, List, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';
import makeStyles from '@mui/styles/makeStyles';
import NavItem from '../NavItem';

import WithRole from '../WithRole';

const useStyles = makeStyles((theme) => ({
  settingsTitle: {
    padding: `${theme.spacing(1)} 0 0 ${theme.spacing(2)}`,
  },
}));

function SettingNavItems({ role }) {
  const classes = useStyles();

  return (
    <Box>
      <Divider />
      <Typography variant="h6" className={classes.settingsTitle}>
        Manage
      </Typography>
      <List>
        {role === 'Leader' && (
          <NavItem href="/manage/teachers" label="Teachers" Icon={SchoolIcon} />
        )}
        {role === 'Leader' && (
          <NavItem href="/manage/subjects" label="Subjects" Icon={EmojiSymbolsIcon} />
        )}
        {role === 'Leader' && (
          <NavItem href="/manage/targets" label="Targets" Icon={TrackChangesIcon} />
        )}
        {(role === 'Leader' || role === 'Teacher') && (
          <NavItem href="/manage/pupils" label="Pupils" Icon={PeopleIcon} />
        )}
      </List>
    </Box>
  );
}

export default WithRole(SettingNavItems);
