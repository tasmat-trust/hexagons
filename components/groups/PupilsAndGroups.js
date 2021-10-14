import PropTypes from 'prop-types';
import { Grid, Typography } from "@material-ui/core";
import PupilsByGroup from "./PupilsByGroup";
import GroupsMenu from "./GroupsMenu";
import useAdminPage from "../../styles/useAdminPage";
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import { useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import CustomSuspense from '../data-fetching/CustomSuspense';
import { Alert } from '@material-ui/lab';

function PupilsAndGroups({ activeGroupSlug, groupName, ...other }) {

  const classes = useAdminPage()
  const { orgId } = useContext(HexagonsContext)

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} xl={2}>
            <GroupsMenu orgId={orgId} {...other} />
          </Grid>
          <Grid item xs={12} md={9} xl={10}>
            <ErrorBoundary alert="Error rendering PupilsByGroup">
              <CustomSuspense message="Loading group">
                {groupName && <PupilsByGroup
                  {...other}
                  groupName={groupName}
                  activeGroupSlug={activeGroupSlug}
                />}
                {!groupName && <Alert data-test-id="please-choose-group">Please choose a group to display pupils.</Alert>}
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
