import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
function ReportCard({ reportType, reportName, reportDesc, testId, reportUrl }) {
  return (
    <Card sx={{ mt: 1, p: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {reportType === 'visual' && (
            <>
              <PieChartIcon sx={{ fontSize: 14 }} /> View and print
            </>
          )}
          {reportType !== 'visual' && (
            <>
              <FileDownloadIcon sx={{ fontSize: 14 }} /> Export to excel
            </>
          )}
        </Typography>
        <Typography component="dt" variant="h4">
          {reportName}
        </Typography>
        <Typography component="dd" variant="body2">
          {reportDesc}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={reportUrl} passHref={true}>
          <Button sx={{ mt: 1 }} variant="outlined" color="secondary" data-test-id={testId}>
            {reportName}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

ReportCard.propTypes = {
  reportType: PropTypes.string,
  reportName: PropTypes.string,
  reportDesc: PropTypes.string,
  testId: PropTypes.string,
  reportUrl: PropTypes.string,
};

export default ReportCard;
