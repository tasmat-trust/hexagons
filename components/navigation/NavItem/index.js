import Link from 'next/link';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useRouter } from 'next/router';

function NavItem({ label, href, Icon, isHomeLink }) {
  const router = useRouter();
  const isActive = router.asPath.includes(href) ? 'active' : '';

  function highlightHome() {
    return router.pathname === '/' ? true : false
  }


  return (
    <li className={`NavItem ${isActive}`}>
      <Link href={href} passHref>
        <ListItem
          button={true}
          component={'a'}
          selected={!isHomeLink ? router.asPath.includes(href) : highlightHome()}
          key={label}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </ListItem>
      </Link>
    </li>
  );
}

export default NavItem;
