import { makeStyles } from '@material-ui/core/styles';


function Header(props) {

  const useStyles = makeStyles((theme) => ({
    Nav: `
      background: red;
    `,
  }));

  const styles = useStyles()

  return (
    <>
      <nav className={styles.Nav}>
        <ul>

        </ul>
      </nav>
    </>
  )
}

export default Header
