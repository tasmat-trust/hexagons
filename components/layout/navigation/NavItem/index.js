import Link from "next/link"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useRouter } from "next/router"

function NavItem({ label, href, Icon }) {
  const router = useRouter()
  return (

    <li className={`NavItem ${router.asPath.includes(href) ? "active" : ""
      }`}>
      <ListItem button key={label}>
        <ListItemIcon><Icon /></ListItemIcon>
        <Link href={href}>{label}</Link>
      </ListItem>
    </li>



  )
}

export default NavItem
