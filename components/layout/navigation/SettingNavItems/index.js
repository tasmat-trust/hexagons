import { Typography, Box, List, Divider } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavItem from "../NavItem"

const useStyles = makeStyles((theme) => ({
  settingsTitle: {
    padding: `${theme.spacing(1)}px 0 0 ${theme.spacing(2)}px`
  }
}));



function SettingNavItems({ session }) {

  const classes = useStyles()
  if (!session) return ''
  if (session.role === 'Public') return ''

  if (session.role != 'Public') return (
    <Box>
      <Divider />
      <Typography variant='h6' className={classes.settingsTitle}>Settings</Typography>
      <List>
        {session.role === 'Senior Leader' && <NavItem href="/manage/org" label="Manage organisation" Icon={DashboardIcon} />}
        {session.role === 'Senior Leader' && <NavItem href="/manage/teachers" label="Manage Teachers" Icon={SchoolIcon} />}
        {session.role === 'Teacher' && <NavItem href="/manage/pupils" label="Manage Pupils" Icon={PeopleIcon} />}
        <NavItem href="/manage/me" label="My account" Icon={PersonIcon} />
      </List>
    </Box>
  )
  return ''

}

export default SettingNavItems