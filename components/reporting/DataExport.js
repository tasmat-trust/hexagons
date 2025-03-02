import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import { useState, useContext, useEffect } from 'react';
import WithAllSubjects from '../data-fetching/WithAllSubjects';
import fileDownload from 'js-file-download';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import CustomSuspense from '../data-fetching/CustomSuspense';

import { Alert } from '@mui/material';
import Loading from '../ui-globals/Loading';
import makeManualGraphQLRequest from '../data-fetching/makeManualGraphQLRequest';
import { getGroupReport } from '../../queries/Groups';

function GetGroupReport({ groupReportVariables, groupName, user }) {
  const [loading, setLoading] = useState(true);
  const [reportContent, setReportContent] = useState('');

  useEffect(() => {
    setReportContent('');
    setLoading(true);
    
    makeManualGraphQLRequest({
      strapiToken: user.strapiToken,
      query: getGroupReport,
      variables: groupReportVariables,
    }).then((data) => {
      console.log(data);
      createReport(data);
    });
  }, [groupName, groupReportVariables, user.strapiToken]);

  function createReport({ groupReport }) {
    if (!groupReport.groupedSubjects) return;
    const flattenedSubjects = groupReport.groupedSubjects.map((subject) => subject.subjects).flat();
    console.log(flattenedSubjects);
    // let csv = `,${groupReport.groupedSubjects
    //   .map(
    //     (subject) =>
    //       `${subject.name} ${subject.subjects.map((s, i) =>
    //         i <= subject.subjects.length ? ',' : ''
    //       )}`
    //   )
    //   .join('')}`;
    // csv += '\r\n';
    let csv = `Pupil ${flattenedSubjects.map((subject) => `, ${subject.slug}`).join('')}`;
    csv += '\r\n';
    //csv += 'Pupil Name, result 1, result 2'
    csv += groupReport.pupils
      .map((pupilReport, i) => {
        const pupilName = pupilReport.name;
        const subjectPositionList = pupilReport.subjectReports
          .map((subjectReport) => {
            if (!subjectReport) return ', ';
            return `, ${subjectReport.score}`;
          })
          .join('');
        return `${pupilName} ${subjectPositionList} \r\n`;
      })
      .join('');
    setReportContent(csv);
    setLoading(false);
  }

  return (
    <>
      {loading && <Loading message="Fetching report data" />}
      {!loading && (
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => fileDownload(reportContent, 'report.csv')}
        >
          Download {groupName} report
        </Button>
      )}
    </>
  );
}

function DataExport({ user, groupName, activeGroupId }) {
  const { orgId } = useContext(HexagonsContext);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    setGeneratingReport(false);
  }, [activeGroupId]);

  function handleDownload() {
    setGeneratingReport(true);
  }

  return (
    <>
      {!groupName && (
        <Alert data-test-id="please-choose-group">Please choose a group to report on.</Alert>
      )}
      {groupName && (
        <>
          {!generatingReport && (
            <Button size="large" variant="contained" color="secondary" onClick={handleDownload}>
              Generate {groupName} Report
            </Button>
          )}
          {generatingReport && (
            <ErrorBoundary alert="Error generating report">
              <CustomSuspense message="Generating report">
                <GetGroupReport
                  user={user}
                  groupName={groupName}
                  groupReportVariables={{ groupId: activeGroupId, orgId: orgId }}
                />
              </CustomSuspense>
            </ErrorBoundary>
          )}
        </>
      )}
    </>
  );
}

DataExport.propTypes = {
  user: PropTypes.object,
  groupName: PropTypes.string,
  activeGroupId: PropTypes.number,
};

export default WithAllSubjects(DataExport);
