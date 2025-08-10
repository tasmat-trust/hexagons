import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import PupilsByGroup from './PupilsByGroup';
import GroupsMenu from './GroupsMenu';
import useAdminPage from '../../styles/useAdminPage';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import { useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import CustomSuspense from '../data-fetching/CustomSuspense';
import { Alert } from '@mui/material';
import PupilsByGroupWithEarlyDevelopment from './PupilsByGroupWithEarlyDevelopment';

function PupilsAndGroups({
  activeGroupSlug,
  groupName,
  schoolType,
  shouldShowGroupBySubject,
  ...other
}) {
  const classes = useAdminPage();
  const { orgId } = useContext(HexagonsContext);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ErrorBoundary alert="Error rendering PupilsByGroup">
            <CustomSuspense message="Loading pupils">
              {activeGroupSlug && schoolType === 'secondary' && (
                <PupilsByGroup
                  {...other}
                  schoolType={schoolType}
                  activeGroupSlug={activeGroupSlug}
                  shouldShowGroupBySubject={shouldShowGroupBySubject}
                />
              )}
              {activeGroupSlug && schoolType === 'primary' && (
                <PupilsByGroupWithEarlyDevelopment
                  {...other}
                  schoolType={schoolType}
                  activeGroupSlug={activeGroupSlug}
                  getEarlyDevelopmentBySlugVariables={{ slug: 'transition' }}
                  shouldShowGroupBySubject={shouldShowGroupBySubject}
                />
              )}
              {!activeGroupSlug && (
                <Alert data-test-id="please-choose-group">
                  Please choose a group to display pupils.
                </Alert>
              )}
            </CustomSuspense>
          </ErrorBoundary>
        </Grid>
        <Grid item xs={12}>
          <GroupsMenu orgId={orgId} {...other} />
        </Grid>
      </Grid>
    </div>
  );
}

PupilsAndGroups.propTypes = {
  activeGroupSlug: PropTypes.string,
  groupName: PropTypes.string,
  schoolType: PropTypes.string,
  shouldShowGroupBySubject: PropTypes.bool,
};

export default PupilsAndGroups;
