import { Button } from "@material-ui/core"
import { useLoginLogout } from '../auth/session'
export default function HomepageLoggedIn(props) {
  const { login } = useLoginLogout(props)
  return (
    <>
      <h1>Welcome to Hexagons.</h1>
      <Button onClick={() => login()}>Login</Button>
    </>
  )
}