import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import { useState, useContext, useEffect } from 'react';
import WithAllSubjects from '../data-fetching/WithAllSubjects';
import fileDownload from 'js-file-download';
import { getPupilsByGroup } from '../../queries/Pupils';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import CustomSuspense from '../data-fetching/CustomSuspense';
import useSWR from 'swr';
import { getLevelsForOverview } from '../../queries/Pupils';
import { allSubjectsQuery } from '../../queries/Subjects';
import axios from 'axios';
import { Alert } from '@mui/material';
import getCurrentLevel from '../../utils/getCurrentLevel';
import Loading from '../ui-globals/Loading';

function GetAllPupilsAndSubjects({ user, groupName, pupilsByGroupVariables }) {
  const [loading, setLoading] = useState(true);
  const [reportContent, setReportContent] = useState('');

  useEffect(() => {
    setReportContent('')
  }, [groupName])

  async function getLevel(getLevelVariables) {
    try {
      const headers = {
        Authorization: `Bearer ${user.strapiToken}`,
      };
      const query = {
        query: getLevelsForOverview,
        variables: getLevelVariables,
      };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, query, {
        headers: headers,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function queryAllData(pupilsData, subjectsData) {
    const pupilsWithLevelVars = pupilsData.pupils.map((pupil, i) => {
      const levels = subjectsData.subjects.map((subject, j) => {
        return { subjectId: parseInt(subject.id), pupilId: parseInt(pupil.id) };
      });
      return levels;
    });

    const pupilsWithLevels = await pupilsWithLevelVars.map(async (pupil, i) => {
      const levels = pupil.map(async (getLevelVariables, j) => {
        const levelData = await getLevel(getLevelVariables);
        return getCurrentLevel(levelData.data.levels);
      });
      const resolvedLevels = await Promise.all(levels);
      return resolvedLevels;
    });
    const resolvedPupilsWithLevels = await Promise.all(pupilsWithLevels);
    return resolvedPupilsWithLevels;
  }

  const { data: pupilsData } = useSWR([getPupilsByGroup, pupilsByGroupVariables], {
    suspense: true,
  });
  const { data: subjectsData } = useSWR([allSubjectsQuery], { suspense: true });

  useEffect(() => {
    queryAllData(pupilsData, subjectsData).then((result) => {
      createReport(result);
    });
  }, [pupilsData, subjectsData, queryAllData]);

  function createReport(subjectPositionsByPupil) {
    let csv = 'Pupil';
    csv += subjectsData.subjects.map((subject) => `, ${subject.slug}`).join('');
    csv += '\r\n';
    //csv += 'Pupil Name, result 1, result 2'
    csv += subjectPositionsByPupil
      .map((positionList, i) => {
        const pupilName = pupilsData.pupils[i].name;
        const subjectPositionList = positionList
          .map((level, j) => {
            if (!level) return ', ';
            // let moduleLabel;
            // if (subjectsData.subjects[3].isRainbowAwards) {
            //   moduleLabel = getRainbowLabel(level);
            // } else {
            let moduleLabel = `${level.module.level === 'stage' ? 'Stage' : 'Step'} ${
              level.module.order
            }`;
            // }
            return `, ${moduleLabel} - ${level.percentComplete}%`;
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
    setGeneratingReport(false)
  }, [activeGroupId])

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
                <GetAllPupilsAndSubjects
                  user={user}
                  groupName={groupName}
                  pupilsByGroupVariables={{ groupId: activeGroupId, orgId: orgId }}
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
