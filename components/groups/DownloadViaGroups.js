import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DataExport from '../reporting/DataExport';
import GroupsMenu from './GroupsMenu';
import useAdminPage from '../../styles/useAdminPage';
import { useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';

function DownloadViaGroups({ user, ...other }) {
  const classes = useAdminPage();
  const { orgId } = useContext(HexagonsContext);
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} xl={2}>
            <GroupsMenu orgId={orgId} userId={user.id} />
          </Grid>
          <Grid item xs={12} md={9} xl={10}>
            <DataExport getEverythingCombined={true} user={user} {...other} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

DownloadViaGroups.propTypes = {
  user: PropTypes.object,
};

export default DownloadViaGroups;
