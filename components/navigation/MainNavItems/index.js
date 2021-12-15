import List from '@mui/material/List';
import PeopleIcon from '@mui/icons-material/People';
import SubjectIcon from '@mui/icons-material/Subject';
import LooksIcon from '@mui/icons-material/Looks';
import NavItem from '../NavItem';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';
import WithRole from '../WithRole';

function MainNavItems({ role }) {
  return (
    <List>
      <NavItem href="/" label="Home" Icon={SubjectIcon} isHomeLink={true} />
      <NavItem href="/pupils" label="Pupils" Icon={PeopleIcon} />
      <NavItem href="/subjects" label="Subjects" Icon={EmojiSymbolsIcon} />
      <NavItem href="/rainbow-awards" label="Rainbow Awards" Icon={LooksIcon} />
      {role === 'Leader' && <NavItem href="/reports" label="Reports" Icon={LooksIcon} />}
    </List>
  );
}

export default WithRole(MainNavItems);
