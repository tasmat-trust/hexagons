import Link from "next/link"
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useRouter } from "next/router"

function NavItem({ label, href, Icon }) {
  const router = useRouter()
  return (

    <li className={`NavItem ${router.asPath.includes(href) ? "active" : ""
      }`}>
      <ListItem
        button={true}
        component={'a'}
        href={href}
        selected={router.asPath.includes(href)}
        key={label}
      >
        <ListItemIcon><Icon /></ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </ListItem>
    </li>



  )
}

export default NavItem
