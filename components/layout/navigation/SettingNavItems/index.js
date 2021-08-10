import { Typography, Box, List, Divider } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavItem from "../NavItem"

const useStyles = makeStyles((theme) => ({
  settingsTitle: {
    padding: `${theme.spacing(1)}px 0 0 ${theme.spacing(2)}px`
  }
}));



function SettingNavItems({ user }) {

  const classes = useStyles()
  if (!user) return ''
  const role = user.role.name ? user.role.name : 'Public'
  if (user.role === 'Public') return ''
  if (role != 'Public') return (
    <Box>
      <Divider />
      <Typography variant='h6' className={classes.settingsTitle}>Manage</Typography>
      <List>
        {role === 'Senior Leader' && <NavItem href="/manage/teachers" label="Teachers" Icon={SchoolIcon} />}
        {role === 'Senior Leader' && <NavItem href="/manage/subjects" label="Subjects" Icon={EmojiSymbolsIcon} />}
        {role === 'Senior Leader' || role === 'Teacher' && <NavItem href="/manage/pupils" label="Pupils" Icon={PeopleIcon} />}
      </List>
    </Box>
  )
  return ''

}

export default SettingNavItems