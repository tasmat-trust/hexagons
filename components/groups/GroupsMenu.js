import { Paper, Box, Typography, Grid } from "@material-ui/core"
import GroupsList from "./GroupsList"
import useAdminPage from "../../styles/useAdminPage"
import { getOrgIdFromSession } from "../../utils"
export default function GroupsMenu(props) {

  const classes = useAdminPage()
  const { user } = props;
  const orgId = getOrgIdFromSession(user)

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper variant="outlined" className={classes.paper}>
            <Box className={classes.box}>
              <Typography data-test-id="title" variant="h4" component="h2" className={classes.title}>My groups</Typography>
            </Box>
            <GroupsList {...props} getMyGroups={true} variables={{ teacherId: user.id }} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" className={classes.paper}>
            <Box className={classes.box}>
              <Typography variant="h4" component="h2" className={classes.title}>All groups</Typography>
            </Box>
            <GroupsList
              {...props}
              variables={{ orgId: orgId }}
            />
          </Paper>
        </Grid>
      </Grid>

    </>
  )
}