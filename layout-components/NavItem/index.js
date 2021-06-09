import Link from "next/link"
import { useRouter } from "next/router"

function NavItem(props) {
  const router = useRouter()
  return (
    <li
      className={`NavItem ${
        router.asPath.includes(props.href) ? "active" : ""
      }`}
    >
      <Link href={props.href}>{props.label}</Link>
    </li>
  )
}

export default NavItem
