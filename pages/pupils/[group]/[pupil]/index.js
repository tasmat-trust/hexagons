import PropTypes from 'prop-types';
import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';
import { Grid, Card, Button } from '@mui/material';
import Subjects from '../../../../components/subjects/Subjects';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';
import useAdminPage from '../../../../styles/useAdminPage';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithPupilData from '../../../../components/data-fetching/WithPupilData';
import CustomHead from '../../../../components/ui-globals/CustomHead';
import SubjectPicker from '../../../../components/navigation/SubjectPicker';
import Link from 'next/link';
function Index({ groupName, activeGroupSlug, pupil, ...other }) {
  const classes = useAdminPage();
  return (
    <div className={classes.root}>
      <CustomHead titleContent={`${pupil.name} | ${groupName} | Subjects`} />
      <BreadCrumbs
        firstLabel="Pupils"
        secondLabel={groupName}
        secondModel="group"
        secondHref={`/pupils/${activeGroupSlug}`}
        thirdLabel={pupil.name}
      /> 
     
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} xl={2}>
            <Card role="region" aria-live="polite" className={`${classes.paper} ${classes.paddingBottom} ${classes.paperAlert}`} >
              <h2>Reports</h2>
              <Button variant="contained"><Link href={`/reports/pupil-overview/${activeGroupSlug}/${pupil.id}`}><a>View report for {pupil.name}</a></Link></Button>
            </Card>
            <Card role="region" aria-live="polite" className={`${classes.paper} ${classes.paddingBottom} ${classes.paperAlert}`} >
              <h2>Rainbow awards</h2>
              <SubjectPicker 
                  isRainbowAwards={true} 
                  activeGroupSlug={activeGroupSlug}
                  currentPupilId={parseInt(pupil.id)}
                />
            </Card>

          </Grid>
          <Grid item xs={12} md={9} xl={10}>
          <Subjects   
             {...other}
              pupil={pupil}
              groupName={groupName}
              activeGroupSlug={activeGroupSlug} />
         </Grid>
        </Grid>
      </div>


 
  );
}

Index.propTypes = {
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
  pupil: PropTypes.object
};

export default WithUrlVariables(WithGroupFromSlug(WithPupilData(Index)));

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});
