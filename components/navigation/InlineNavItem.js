import Link from "next/link"
import { useRouter } from "next/router"

function NavItem({ label, href }) {
  const router = useRouter()
  return (

    <li className={`NavItem ${router.asPath.includes(href) ? "active" : ""
      }`}>
      <Link href={href}><a>{label}</a></Link>
    </li>



  )
}

export default NavItem
