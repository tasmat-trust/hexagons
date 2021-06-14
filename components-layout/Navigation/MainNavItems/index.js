import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import NavItem from "../NavItem"

function MainNavItems() {
  return (
    <List>
      <NavItem href="/" label="Home" Icon={HomeIcon} />
      <NavItem href="/pupils" label="Pupils" Icon={PeopleIcon} />
    </List>
  )
}

export default MainNavItems