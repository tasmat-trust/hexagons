import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import PupilsByGroup from "./PupilsByGroup";
import GroupsMenu from "./GroupsMenu";
import useAdminPage from "../../styles/useAdminPage"; 

function PupilsAndGroups({ orgId, activeGroupSlug, ...other }) {

  const classes = useAdminPage()

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} xl={2}>
            <GroupsMenu orgId={orgId} {...other} />
          </Grid>
          <Grid item xs={12} md={8} xl={10}>
            <PupilsByGroup
              {...other}
              orgId={orgId}
              activeGroupSlug={activeGroupSlug}
            />
          </Grid>

        </Grid>
      </div>
    </>
  )
}

PupilsAndGroups.propTypes = {
  activeGroupSlug: PropTypes.string
}

export default PupilsAndGroups
