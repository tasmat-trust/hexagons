import PropTypes from 'prop-types';
import { Paper, Box, Typography } from '@mui/material';
import DialogButton from '../ui-globals/DialogButton'

import WithSnapshots from '../data-fetching/WithSnapshots';
import useAdminPage from '../../styles/useAdminPage';
import {AddNewSnapshot} from '../../components/forms/AddNew'

import BreadCrumbs from '../../components/navigation/Breadcrumbs';
import RoleInfoBanner from '../../components/layout/RoleInfoBanner';

function Snapshots(props) {
  const { user, snapshots, orgId, refetchSnapshots } = props
  const classes = useAdminPage()
  return (
    <>
      <RoleInfoBanner role="Leader" />
      <BreadCrumbs firstLabel="Snapshots" />

      <Paper variant="outlined" className={classes.paper}>
        <Box className={classes.box}>
          <Typography variant="h4" component="h2" className={classes.title}>Snapshots</Typography>
          {/* <Typography variant="p" component="p">You can browse target snapshots below.</Typography> */}
          <DialogButton
            title="Create new snapshot"
            className={classes.button}
            label="New snapshot"
            testId="new-snapshot"
            variant='contained'
            color='secondary'
            text={`Create a new snapshot - individual pupil targets can then be adjusted.`}
            modelname="snapshot">
            <AddNewSnapshot
              {...props}
              triggerSharedState={refetchSnapshots}
              variables={{ orgId: orgId }}
            />
          </DialogButton>
        </Box>
        {snapshots &&
          [...snapshots].reverse().map((snapshot, i) => (
            <div key={`snapshot-${snapshot.name}`}>
              <h1>{snapshot.name}</h1>
            </div>
          ))}
      </Paper>
    </>
  );
}

Snapshots.propTypes = {
  user: PropTypes.object,
  orgId: PropTypes.number,
  snapshots: PropTypes.object,
  refetchSnapshots: PropTypes.object
};

export default WithSnapshots(Snapshots);
