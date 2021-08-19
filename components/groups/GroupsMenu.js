import PropTypes from 'prop-types'
import { Paper, Box, Typography, Grid } from "@material-ui/core"
import GroupsList from "./GroupsList"
import useAdminPage from "../../styles/useAdminPage"
function GroupsMenu({orgId, userId, ...other}) {

  const classes = useAdminPage() 

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper variant="outlined" className={classes.paper}>
            <Box className={classes.box}>
              <Typography data-test-id="title" variant="h4" component="h2" className={classes.title}>My groups</Typography>
            </Box>
            <GroupsList {...other} getMyGroups={true} getGroupsVariables={{ teacherId: userId, orgId: orgId }} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" className={classes.paper}>
            <Box className={classes.box}>
              <Typography variant="h4" component="h2" className={classes.title}>All groups</Typography>
            </Box>
            <GroupsList
              {...other}
              getGroupsVariables={{ orgId: orgId }}
            />
          </Paper>
        </Grid>
      </Grid>

    </>
  )
}

GroupsMenu.propTypes = {
  orgId: PropTypes.number,
  userId: PropTypes.number
}

export default GroupsMenu