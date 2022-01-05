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

function GetAllPupilsAndSubjects({ user, groupName, pupilsByGroupVariables }) {
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
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      // handleApiLoginErrors(e, 'setError', 'setLoading'); //todo
      //return 'error';
    }
  }

  async function queryAllData(pupilsData, subjectsData) {
    const pupilsWithLevelVars = pupilsData.pupils.map((pupil, i) => {
      const levels = subjectsData.subjects.map((subject, j) => {
        const getLevelVariables = { subjectId: subject.id, pupilId: pupil.id };
        return getLevelVariables;
      });
      return levels;
    });

    const pupilsWithLevels = await pupilsWithLevelVars.map(async (pupil, i) => {
      const level = pupil.map(async (getLevelVariables, j) => {
        const levelData = await getLevel(getLevelVariables);
        return levelData;
      });
      return level;
    });
    console.log(pupilsWithLevels);
    return pupilsWithLevels;
  }

  const { data: pupilsData } = useSWR([getPupilsByGroup, pupilsByGroupVariables], {
    suspense: true,
  });
  const { data: subjectsData } = useSWR([allSubjectsQuery], { suspense: true });

  useEffect(() => {
    queryAllData(pupilsData, subjectsData).then((result) => {
      console.log(result);
    });
  }, [pupilsData, subjectsData, queryAllData]);

  const response =
    'Name, Maths, English\r\nAli Blackwell, Full marks, Full marks \r\nImogen French, Full marks, Full marks';

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => fileDownload(response, 'report.csv')}
      >
        Download {groupName} report
      </Button>
    </>
  );
}

function DataExport({ user, groupName, activeGroupSlug, activeGroupId }) {
  const { orgId } = useContext(HexagonsContext);
  const [generatingReport, setGeneratingReport] = useState(false);

  function handleDownload() {
    setGeneratingReport(true);
  }

  return (
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
  );
}

DataExport.propTypes = {
  user: PropTypes.object,
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
  activeGroupId: PropTypes.number,
};

export default WithAllSubjects(DataExport);
