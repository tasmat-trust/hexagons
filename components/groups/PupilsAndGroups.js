import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import PupilsByGroup from "./PupilsByGroup";
import GroupsMenu from "./GroupsMenu";
import useAdminPage from "../../styles/useAdminPage";
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import { useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import CustomSuspense from '../data-fetching/CustomSuspense';

function PupilsAndGroups({ activeGroupSlug, ...other }) {

  const classes = useAdminPage()
  const { orgId } = useContext(HexagonsContext)

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} xl={2}>
            <GroupsMenu orgId={orgId} {...other} />
          </Grid>
          <Grid item xs={12} md={8} xl={10}>
            <ErrorBoundary alert="Error rendering PupilsByGroup">
              <CustomSuspense message="Loading group">
                <PupilsByGroup
                  {...other}
                  activeGroupSlug={activeGroupSlug}
                />
              </CustomSuspense>
            </ErrorBoundary>
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
