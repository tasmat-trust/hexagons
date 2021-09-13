import Link from 'next/link';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
