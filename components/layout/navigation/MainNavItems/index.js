import List from '@material-ui/core/List';
import PeopleIcon from '@material-ui/icons/People';
import SubjectIcon from '@material-ui/icons/Subject';
import LooksIcon from '@material-ui/icons/Looks';
import NavItem from "../NavItem"
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';

function MainNavItems() { 
  return (
    <List>
      <NavItem href="/groups" label="Groups" Icon={PeopleIcon} />
      <NavItem href="/pupils" label="Pupils" Icon={SubjectIcon} />
      <NavItem href="/rainbow-awards" label="Rainbow Awards" Icon={LooksIcon} />
    </List>
  )
}

export default MainNavItems