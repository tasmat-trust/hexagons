import { withSession } from '../../components/auth/session';
import checkSession from '../../components/auth/checkSession';
import BreadCrumbs from '../../components/navigation/Breadcrumbs';
import CustomHead from '../../components/ui-globals/CustomHead';
import { Grid } from '@mui/material';

import ReportCard from '../../components/reporting/ReportCard';

export default function Reports(props) {
  return (
    <>
      <CustomHead titleContent="Reports" />
      <BreadCrumbs firstLabel="Reports" />

      <Grid
        container
        component="dl" // mount a Definition List
        spacing={3}
      >
        <Grid item xs={12} md={4}>
          <ReportCard
            reportType="visual"
            reportName="Pupil Overview"
            reportDesc="View a pupil's complete progress across academic attainment and personal development."
            testId="pupil-overview-link"
            reportUrl="/reports/pupil-overview"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ReportCard
            reportType="visual"
            reportName="Group Overview"
            reportDesc="View all pupils in a given group."
            testId="group-overview-link"
            reportUrl="/reports/group-overview"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ReportCard
            reportType="export"
            reportName="Data export"
            reportDesc="Export a CSV file for importing into SIMS."
            testId="data-export-link"
            reportUrl="/reports/data-export"
          />
        </Grid>
      </Grid>
    </>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader');
});
