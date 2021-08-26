import { Paper } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import useAdminPage from "../../styles/useAdminPage"


function Message({ role }) {
  if (role === 'Leader') return <>This is an <b>SLT</b> page. It is only visible to Leaders</>
  if (role === 'Teacher') return <>This is a <b>Teacher</b> page. It is only visible to Teachers and Leaders</>
  return ''
}


export default function RoleInfoBanner({ role }) {

  const classes = useAdminPage()
  return (
    <Paper className={classes.paperAlert} elevation={2}>
      <Alert severity="info" data-test-id="notification"><Message role={role} /></Alert>
    </Paper>
  )
}