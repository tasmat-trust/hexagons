import { Typography, Box, List, Divider } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
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
  const user = session ? session.user ? session.user : false : false

  if (user && user.name === 'Public') return ''

  if (user && user.name != 'Authenticated') return (
    <Box>
      <Divider />
      <Typography variant='h6' className={classes.settingsTitle}>Settings</Typography>
      <List>
        {user && user.name === 'Super Admin' && <NavItem href="/global-admin" label="Global admin" Icon={DashboardIcon} />}
        <NavItem href="/manage/pupils" label="Manage Pupils" Icon={PeopleIcon} />

        <NavItem href="/manage/teachers" label="Manage Teachers" Icon={SchoolIcon} />
      </List>
    </Box>
  )
  return ''
}

export default SettingNavItems