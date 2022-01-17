import PropTypes from 'prop-types';
import {  Box, Typography, Grid, Card } from '@mui/material';
import GroupsList from './GroupsList';
import useAdminPage from '../../styles/useAdminPage';
import { useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import CustomSuspense from '../data-fetching/CustomSuspense';
function GroupsMenu({ userId, ...other }) {
  const classes = useAdminPage();
  const { orgId } = useContext(HexagonsContext);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card role="region" aria-live="polite" className={classes.paper}>
            <Box className={classes.box} data-test-id="my-groups">
              <Typography
                data-test-id="title"
                variant="h4"
                component="h2"
                className={classes.title}
              >
                My groups
              </Typography>
            </Box>
            <CustomSuspense message="Checking groups">
              <GroupsList
                {...other}
                getMyGroups={true}
                getGroupsVariables={{ teacherId: userId, orgId: orgId }}
              />
            </CustomSuspense>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card role="region" aria-live="polite" className={classes.paper}>
            <Box className={classes.box} data-test-id="all-groups">
              <Typography variant="h4" component="h2" className={classes.title}>
                All groups
              </Typography>
            </Box>
            <CustomSuspense message="Checking groups">
              <GroupsList {...other} getGroupsVariables={{ orgId: orgId }} />
            </CustomSuspense>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

GroupsMenu.propTypes = {
  userId: PropTypes.number,
};

export default GroupsMenu;
