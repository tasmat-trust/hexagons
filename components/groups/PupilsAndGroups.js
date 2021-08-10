import BreadCrumbs from "../layout/navigation/Breadcrumbs";
import { Grid } from "@material-ui/core";
import PupilsByGroup from "./PupilsByGroup";
import GroupsMenu from "./GroupsMenu";
import { getOrgIdFromSession } from "../../utils";
import { useState } from "react";
import useAdminPage from "../../styles/useAdminPage";

export default function PupilsAndGroups(props) {
  const { user, activeGroup, setGroupName } = props;

  const classes = useAdminPage()

  const orgId = getOrgIdFromSession(user)
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <PupilsByGroup
              {...props}
              groupFromSlugVariables={{ orgId: orgId, slug: activeGroup }}
              groupSlug={activeGroup}
              setGroupName={setGroupName}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <GroupsMenu {...props} />
          </Grid>
        </Grid>
      </div>


    </>
  )
}