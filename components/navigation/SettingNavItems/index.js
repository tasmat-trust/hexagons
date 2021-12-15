import { Typography, Box, List, Divider } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import { makeStyles } from '@material-ui/core/styles';
import NavItem from '../NavItem';

import WithRole from '../WithRole';

const useStyles = makeStyles((theme) => ({
  settingsTitle: {
    padding: `${theme.spacing(1)}px 0 0 ${theme.spacing(2)}px`,
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
        {(role === 'Leader' || role === 'Teacher') && (
          <NavItem href="/manage/pupils" label="Pupils" Icon={PeopleIcon} />
        )}
      </List>
    </Box>
  );
}

export default WithRole(SettingNavItems);
