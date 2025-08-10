import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import Subjects from '../subjects/Subjects';
import GroupsMenu from './GroupsMenu';
import useAdminPage from '../../styles/useAdminPage';
import { useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';

function SubjectsAndGroups({ userId, ...other }) {
  const classes = useAdminPage();
  const { orgId } = useContext(HexagonsContext);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} xl={2}>
          <GroupsMenu orgId={orgId} userId={userId} />
        </Grid>
        <Grid item xs={12} md={9} xl={10}>
          <Subjects linkTo="/subjects" isNarrow={true} {...other} />
        </Grid>
      </Grid>
    </div>
  );
}

SubjectsAndGroups.propTypes = {
  userId: PropTypes.number,
};

export default SubjectsAndGroups;
