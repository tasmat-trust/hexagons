import List from '@mui/material/List';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import LooksIcon from '@mui/icons-material/Looks';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import BuildIcon from '@mui/icons-material/Build';
import NavItem from '../NavItem';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import WithRole from '../WithRole';
import { HexagonsContext } from '../../data-fetching/HexagonsContext';
import { useContext } from 'react';
function MainNavItems({ role }) {
  const { useEarlyDevelopment } = useContext(HexagonsContext);
  const { useFunctionalSkills } = useContext(HexagonsContext);
  return (
    <List>
      <NavItem href="/" label="Home" Icon={HomeIcon} isHomeLink={true} />
      <NavItem href="/pupils" label="Pupils" Icon={PeopleIcon} />
      <NavItem href="/subjects" label="Subjects" Icon={EmojiSymbolsIcon} />
      <NavItem href="/rainbow-awards" label="Rainbow Awards" Icon={LooksIcon} />
      {useEarlyDevelopment && <NavItem href="/early-development" label="Early development" Icon={AccessibilityNewIcon} />}
      {useFunctionalSkills && <NavItem href="/functional-skills" label="Functional skills" Icon={BuildIcon} />}
      {role === 'Leader' && <NavItem href="/reports" label="Reports" Icon={StackedLineChartIcon} />}
    </List>
  );
}

export default WithRole(MainNavItems);
