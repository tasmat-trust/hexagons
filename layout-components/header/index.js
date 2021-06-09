import NavItem from "../NavItem"

function Header(props) {
  return (
    <>
      <nav>
        <ul>
          <NavItem href="/home" label="Home" />
          <NavItem href="/pupils" label="Pupils" />
        </ul>
      </nav>
    </>
  )
}

export default Header
