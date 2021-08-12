import { Button } from "@material-ui/core"
export default function HomepageLoggedIn(props) {
  return (
    <>
      <h1>Welcome to Hexagons.</h1>
      <Button onClick={() => login()}>Login</Button>
    </>
  )
}